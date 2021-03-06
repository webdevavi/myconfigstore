import add from "date-fns/add"
import { Account, Profile } from "next-auth"
import { Adapter } from "next-auth/adapters"
import pricing from "../../pricing.json"
import { HarperDB } from "../harperDB"
import { AppUser, AppUserJSON, IAppUser, PaymentStatus, Plans } from "../models"

// @ts-expect-error
export const HarperDBAdapter: Adapter<HarperDB, never, IAppUser, Profile> = (db) => {
	return {
		async getAdapter() {
			return {
				displayName: "HARPER-DB",

				async createUser(profile) {
					const { name, email, image } = profile

					const user: Omit<AppUserJSON, "id"> = {
						name,
						email,
						image,
						subscription: {
							plan: Plans.Trial,
							status: PaymentStatus.Unpaid,
							expiry: add(new Date(), { days: pricing.trial.days }).getTime(),
						},
					}

					const [userId] = await db.insert<Omit<AppUserJSON, "id">>({
						table: "users",
						records: [user],
					})

					return AppUser.fromJSON({ id: userId, ...user })
				},

				async getUser(id) {
					const [user] = await db.findByIds<AppUserJSON>([id], { table: "users" })

					if (!user) return null

					return AppUser.fromJSON(user)
				},

				async getUserByEmail(email) {
					if (!email) return null

					const [user] = await db.findByValue<AppUserJSON>("email", email, { table: "users" })

					if (!user) return null

					return AppUser.fromJSON(user)
				},

				async getUserByProviderAccountId(providerId, providerAccountId) {
					const [accountSnapshot] = await db.findByConditions<Account>(
						"and",
						[
							{ attribute: "providerId", type: "equals", value: providerId },
							{ attribute: "providerAccountId", type: "equals", value: providerAccountId },
						],
						{
							table: "accounts",
							limit: 1,
						}
					)

					if (!accountSnapshot) return null

					const userId = accountSnapshot?.userId as string

					if (!userId) return null

					const [user] = await db.findByIds<AppUserJSON>([userId], { table: "users" })

					if (!user) return null

					return AppUser.fromJSON(user)
				},

				async updateUser(user) {
					await db.update<AppUserJSON>({
						table: "users",
						records: [new AppUser(user).toJSON()],
					})

					return user
				},

				async deleteUser(userId) {
					await db.delete([userId], {
						table: "users",
					})
				},

				async linkAccount(userId, providerId, providerType, providerAccountId, refreshToken, accessToken, accessTokenExpires) {
					const account = {
						userId,
						providerId,
						providerType,
						providerAccountId,
						refreshToken,
						accessToken,
						accessTokenExpires,
					}

					await db.insert({
						table: "accounts",
						records: [account],
					})

					return account
				},

				async unlinkAccount(userId, providerId, providerAccountId) {
					const [account] = await db.findByConditions<Account>(
						"and",
						[
							{ attribute: "userId", type: "equals", value: userId },
							{ attribute: "providerId", type: "equals", value: providerId },
							{ attribute: "providerAccountId", type: "equals", value: providerAccountId },
						],
						{
							table: "accounts",
							limit: 1,
						}
					)

					if (!account) return null

					const accountId = account.id

					return db.delete([accountId], { table: "accounts" })
				},

				// next-auth throws error if these functions aren't defined
				// even though we don't need these, since we are using JWT
				// for session and not database persistence

				/* eslint-disable @typescript-eslint/no-empty-function */
				async createSession() {},
				async getSession() {},
				async updateSession() {},
				async deleteSession() {},
			}
		},
	}
}
