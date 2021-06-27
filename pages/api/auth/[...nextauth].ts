import { HarperDBAdapter } from "@lib/adapters/haerperDB"
import { harperdb } from "@lib/harperDB"
import NextAuth from "next-auth"
import Providers from "next-auth/providers"

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
	adapter: HarperDBAdapter(harperdb),
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		signingKey: `{"kty":"oct","kid":"${process.env.JWT_SIGNING_KEY_KID}","alg":"HS512","k":"${process.env.JWT_SIGNING_KEY_K}"}`,
		encryption: true,
		encryptionKey: `{"kty":"oct","kid":"${process.env.JWT_ENCRYPTION_KEY_KID}","alg":"A256GCM","k":"${process.env.JWT_ENCRYPTION_KEY_K}"}`,
	},
	callbacks: {
		session: async (session, user) => {
			/* eslint-disable no-param-reassign */
			session.id = user.sub
			return Promise.resolve(session)
		},
		signIn: (user, account) => {
			if (!user.email) {
				return `/auth/error?error=${encodeURIComponent(
					`Your ${account.provider} account doesn't have any email address added. Please sign in with an account having a verified email address.`
				)}`
			}

			return true
		},
	},
})
