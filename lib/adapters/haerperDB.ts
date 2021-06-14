import { Account, Profile, User } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { HarperDB } from "../harperDB"
import { AppUser } from "../models"

// @ts-expect-error
export const HarperDBAdapter: Adapter<HarperDB, never, User & { id: string }, Profile> = (db) => {
	return {
		async getAdapter() {
			return {
				displayName: "HARPER-DB",

				async createUser(profile) {
					const { name, email, image } = profile

					const userIds = await db.insert<User>({
						table: "users",
						records: [{ name, email, image }],
					})

					if (userIds) return new AppUser({ id: userIds[0], name, email, image })
				},

				async getUser(id) {
					const users = await db.findByIds<User>([id], { table: "users" })
					if (users) return new AppUser(users[0])
				},

				async getUserByEmail(email) {
					if (!email) return null
					const users = await db.findByValue<User>("email", email, { table: "users" })
					if (users) return new AppUser(users[0])
				},

				async getUserByProviderAccountId(providerId, providerAccountId) {
					const accountSnapshot = await db.findByConditions<Account>(
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

					const userId = accountSnapshot?.[0]?.userId as string

					if (!userId) return null

					const users = await db.findByIds<User>([userId], { table: "users" })
					if (users) return new AppUser(users[0])
				},

				async updateUser(user) {
					await db.update<User>({
						table: "users",
						records: [user],
					})

					return user
				},

				async deleteUser(userId) {
					await db.delete<User>([userId], {
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
					const accounts = await db.findByConditions<Account>(
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

					if (!accounts) return null

					const accountId = accounts[0].id

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
