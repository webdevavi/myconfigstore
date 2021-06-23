import { NextPageWithSEO } from "@lib/types"
import { ServerResponse } from "http"
import { Session } from "next-auth"
import { getSession, useSession } from "next-auth/client"
import { useRouter } from "next/router"
import React from "react"

type WithAuthOptions = {
	redirect?: "onAuth" | "onUnauth" | "none"
	redirectTo?: string
}

export const WithAuth = <T extends object>(Component: NextPageWithSEO<T>, options: WithAuthOptions = {}) => {
	const { redirect = "onUnauth", redirectTo = "/auth/signin" } = options

	const Auth: NextPageWithSEO<T & { session: Session | null }> = ({ session, ...pageProps }) => {
		const [isClear, setIsClear] = React.useState(false)

		const [clientSession, loading] = useSession()
		const isUser = Boolean(session ?? clientSession)

		const { replace } = useRouter()

		React.useEffect(() => {
			if (!loading) {
				if (redirect !== "none") {
					if (redirect === "onAuth" && isUser) {
						replace(redirectTo)
					} else if (redirect === "onUnauth" && !isUser) {
						replace(redirectTo)
					} else setIsClear(true)
				}
			}
		}, [isUser, loading])

		if (isClear) {
			return <Component {...(pageProps as T)} />
		}

		return <div>Loading...</div>
	}

	const redirectTemporarily = (res: ServerResponse) => {
		res.writeHead(302, {
			Location: redirectTo,
		})
		res.end()
	}

	Auth.getInitialProps = async (ctx) => {
		const session = await getSession(ctx)

		const { res } = ctx

		if (res && redirect !== "none") {
			if (redirect === "onAuth" && session) {
				redirectTemporarily(res)
			} else if (redirect === "onUnauth" && !session) {
				redirectTemporarily(res)
			}
		}

		const pageProps = (await Component.getInitialProps?.(ctx)) as object as T

		return { ...pageProps, session }
	}

	Auth.seo = Component.seo

	return Auth
}
