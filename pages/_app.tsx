import { ChakraProvider } from "@chakra-ui/react"
import { DrawerModal } from "@components"
import "@fontsource/muli/latin-700.css"
import "@fontsource/muli/latin-900.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import { ContextProvider } from "@lib/context"
import { NextPageWithSEO } from "@lib/types"
import { NextPage } from "next"
import { Provider } from "next-auth/client"
import { DefaultSeo } from "next-seo"
import { AppProps } from "next/dist/next-server/lib/router/router"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import merge from "lodash/merge"
import theme from "../theme"
import { seo } from "../next-seo.config"

const queryClient = new QueryClient()

const MyApp: NextPage<Omit<AppProps, "Component"> & { Component: NextPageWithSEO }> = ({ Component, pageProps }) => {
	const mergedSeo = merge(seo, Component.seo)

	return (
		<ChakraProvider theme={theme}>
			<Provider session={pageProps.session}>
				<QueryClientProvider client={queryClient}>
					<ContextProvider>
						<DefaultSeo {...mergedSeo} />
						<Component {...pageProps} />
						<DrawerModal />
					</ContextProvider>
				</QueryClientProvider>
			</Provider>
		</ChakraProvider>
	)
}

export default MyApp
