import add from "date-fns/add"
import { HarperDB } from "harperdbjs"
import { Account, Profile } from "next-auth"
import { Adapter } from "next-auth/adapters"
import pricing from "../../pricing.json"
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

					const { inserted_hashes } = await db.insert<Omit<AppUserJSON, "id">>(user, {
						schema: "dev",
						table: "users",
					})

					if (!inserted_hashes?.[0]) {
						return null
					}

					const [userId] = inserted_hashes

					return AppUser.fromJSON({ id: userId, ...user })
				},

				async getUser(id) {
					const {
						records: [user],
					} = await db.searchByHash([id], { schema: "dev", table: "users" })

					if (!user) return null

					return AppUser.fromJSON(user as AppUserJSON)
				},

				async getUserByEmail(email) {
					if (!email) return null

					const {
						records: [user],
					} = await db.searchByValue("email", email, { schema: "dev", table: "users" })

					if (!user) return null

					return AppUser.fromJSON(user as AppUserJSON)
				},

				async getUserByProviderAccountId(providerId, providerAccountId) {
					const {
						records: [accountSnapshot],
					} = await db.searchByConditions(
						[
							{ searchAttribute: "providerId", searchType: "equals", searchValue: providerId },
							{ searchAttribute: "providerAccountId", searchType: "equals", searchValue: providerAccountId },
						],
						{
							schema: "dev",
							table: "accounts",
							limit: 1,
						}
					)

					if (!accountSnapshot) return null

					const userId = (accountSnapshot as Account)?.userId as string

					if (!userId) return null

					const {
						records: [user],
					} = await db.searchByHash([userId], { schema: "dev", table: "users" })

					if (!user) return null

					return AppUser.fromJSON(user as AppUserJSON)
				},

				async updateUser(user) {
					await db.updateOne<AppUserJSON>(new AppUser(user).toJSON(), {
						schema: "dev",
						table: "users",
					})

					return user
				},

				async deleteUser(userId) {
					await db.deleteOne(userId, {
						schema: "dev",
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

					await db.insert(account, {
						schema: "dev",
						table: "accounts",
					})

					return account
				},

				async unlinkAccount(userId, providerId, providerAccountId) {
					const {
						records: [account],
					} = await db.searchByConditions(
						[
							{ searchAttribute: "userId", searchType: "equals", searchValue: userId },
							{ searchAttribute: "providerId", searchType: "equals", searchValue: providerId },
							{ searchAttribute: "providerAccountId", searchType: "equals", searchValue: providerAccountId },
						],
						{
							schema: "dev",
							table: "accounts",
							limit: 1,
						}
					)

					if (!account) return null

					const accountId = (account as Account).id

					return db.deleteOne(accountId, { schema: "dev", table: "accounts" })
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
