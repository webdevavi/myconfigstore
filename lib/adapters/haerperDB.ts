import { Account, Profile, User } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { HarperDB } from "../harperDB"
import { AppUser, IAppUser, PaymentStatus, Plans } from "../models"
import { addStripeCustomer, deleteStripeCustomer } from "../subscription"
import add from "date-fns/add"
import pricing from "../../pricing.json"

// @ts-expect-error
export const HarperDBAdapter: Adapter<HarperDB, never, IAppUser, Profile> = (db) => {
	return {
		async getAdapter() {
			return {
				displayName: "HARPER-DB",

				async createUser(profile) {
					const { name, email, image } = profile

					const stripeCustomerId = await addStripeCustomer(name, email)

					const user = {
						name,
						email,
						image,
						subscription: {
							stripeCustomerId,
							plan: Plans.Trial,
							status: PaymentStatus.Unpaid,
							expiry: add(new Date(), { days: pricing.trial.days }),
						},
					}

					const [userId] = await db.insert<Omit<IAppUser, "id">>({
						table: "users",
						records: [user],
					})

					if (!userId) {
						deleteStripeCustomer(stripeCustomerId)
						return null
					}

					return new AppUser({ id: userId, ...user })
				},

				async getUser(id) {
					const [user] = await db.findByIds<IAppUser>([id], { table: "users" })

					if (!user) return null

					return new AppUser(user)
				},

				async getUserByEmail(email) {
					if (!email) return null

					const [user] = await db.findByValue<IAppUser>("email", email, { table: "users" })

					if (!user) return null

					return new AppUser(user)
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

					const [user] = await db.findByIds<IAppUser>([userId], { table: "users" })

					if (!user) return null

					return new AppUser(user)
				},

				async updateUser(user) {
					await db.update<IAppUser>({
						table: "users",
						records: [user],
					})

					return user
				},

				async deleteUser(userId) {
					await db.delete<IAppUser>([userId], {
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

					await db.delete([accountId], { table: "accounts" })
				},

				async createSession() {},
				async getSession() {},
				async updateSession() {},
				async deleteSession() {},
			}
		},
	}
}
