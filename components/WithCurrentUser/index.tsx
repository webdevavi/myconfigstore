import { NextPageWithSEO } from "@lib/types"
import React from "react"
import { useCurrentUserQuery } from "../../lib/hooks/session"

export const WithCurrentUser = <T extends object>(Component: NextPageWithSEO<T>) => {
	const CurrentUser: NextPageWithSEO<T> = (pageProps) => {
		const { isLoading } = useCurrentUserQuery()

		if (isLoading) {
			return <div>Loading...</div>
		}

		return <Component {...pageProps} />
	}

	if (Component.getInitialProps) {
		CurrentUser.getInitialProps = async (ctx) => {
			const pageProps = (await Component.getInitialProps?.(ctx)) as T
			return { ...pageProps }
		}
	}

	CurrentUser.seo = Component.seo

	return CurrentUser
}
