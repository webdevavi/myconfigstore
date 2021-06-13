import { NextPage } from "next"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		<Component {...pageProps} />
	</ChakraProvider>
)

export default MyApp
