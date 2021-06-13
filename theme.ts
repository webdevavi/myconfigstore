import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
}

const colors: ReturnType<typeof extendTheme>["colors"] = {
	brand: {
		dark: "#1B1A17",
		orange: "#FF8303",
		orangeDark: "#A35709",
		light: "#F0E7C9",
	},
}

const fonts: ReturnType<typeof extendTheme>["fonts"] = {
	heading: "Muli",
	body: "Poppins",
}

const theme = extendTheme({ config, colors, fonts })

export default theme
