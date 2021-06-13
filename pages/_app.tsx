import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/muli/latin-700.css"
import "@fontsource/muli/latin-900.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import { NextPage } from "next"
import { AppProps } from "next/dist/next-server/lib/router/router"
import theme from "../theme"

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		<Component {...pageProps} />
	</ChakraProvider>
)

export default MyApp
