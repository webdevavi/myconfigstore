import { NextPage } from "next"
import React from "react"
import { useCurrentUserQuery } from "../../lib/hooks/session"

export const WithCurrentUser = (Component: NextPage<unknown>) => {
	const CurrentUser: NextPage = (pageProps) => {
		const { isLoading } = useCurrentUserQuery()

		if (isLoading) {
			return <div>Loading...</div>
		}

		return <Component {...pageProps} />
	}

	if (Component.getInitialProps) {
		CurrentUser.getInitialProps = async (ctx) => {
			const pageProps = (await Component.getInitialProps?.(ctx)) as object
			return { ...pageProps }
		}
	}

	return CurrentUser
}
