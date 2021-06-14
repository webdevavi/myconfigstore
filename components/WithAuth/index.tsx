import { NextPage } from "next"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import React from "react"

type WithAuthOptions = {
	redirect?: "onAuth" | "onUnauth" | "none"
	redirectTo?: string
}

export const WithAuth = (Component: NextPage<unknown>, options: WithAuthOptions = {}) => {
	const { redirect = "onUnauth", redirectTo = "/auth/signin" } = options

	const Auth: NextPage = () => {
		const [isClear, setIsClear] = React.useState(false)

		const [session, loading] = useSession()
		const isUser = Boolean(session?.user)

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
			return <Component />
		}

		return <div>Loading...</div>
	}

	Auth.getInitialProps = async (ctx) => {
		const pageProps = Component.getInitialProps && ((await Component.getInitialProps(ctx)) as object)
		return { ...pageProps }
	}

	return Auth
}
