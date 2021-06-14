import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/muli/latin-700.css"
import "@fontsource/muli/latin-900.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import { NextPage } from "next"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { QueryClient, QueryClientProvider } from "react-query"
import theme from "../theme"

const queryClient = new QueryClient()

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	</ChakraProvider>
)

export default MyApp
