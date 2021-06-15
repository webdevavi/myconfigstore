import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { HarperDBAdapter } from "../../../lib/adapters/haerperDB"
import { HarperDB } from "../../../lib/harperDB"

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		Providers.Facebook({
			clientId: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_APP_SECRET,
		}),
		Providers.Auth0({
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			domain: process.env.AUTH0_DOMAIN,
		}),
	],
	secret: process.env.AUTH_SECRET,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
	},
	adapter: HarperDBAdapter(new HarperDB("dev")),
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
	},
	jwt: {
		secret:
			"eLghIljF2O4Z1E8t6UyyaU8VetaRinDmziTYD9q3GvXP4bTf4rBhwNocB7CBDeiMQcQSfCnPm60untHy7jy+LHiV78QbjOPPp+MrOxzGk18wogCQi8TqlelnlrTLawj60JyNaZS4NvgtI5Jmqut0ebgArzc4hNw5sV3jRBsIU58=",
		signingKey: '{"kty":"oct","kid":"ZAJC-QwLXK7Tde_jzwKLo48_-bZC7O2JDs2P1xnZqgk","alg":"HS512","k":"luSiVwDbbTrOvaqDzVu3SVtql_1trH9we0MVFR6ZKpc"}',
		encryption: true,
		encryptionKey:
			'{"kty":"oct","kid":"0jUwdDDn3j0SzLNZrDJI-rS5XaF66w89SFbU2t738w0","alg":"A256GCM","k":"Ypq39CVAnoUVS9qsCHlCSEtHJObbC8BejwgmMfkRgqs"}',
	},
})
