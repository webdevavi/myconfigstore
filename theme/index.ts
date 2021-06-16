import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { Button, Card, FormError, FormLabel, Heading, Input, Modal, Tooltip } from "./components"

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
}

const colors: ReturnType<typeof extendTheme>["colors"] = {
	brand: {
		dark: "#1B1A17",
		dark2: "#232220",
		orange: "#FF8303",
		orangeLightest: "#392C1D",
		orangeLight: "#98541A",
		orangeDark: "#A35709",
		light: "#F0E7C9",
		success: "#5FDE12",
		error: "#FF6464",
	},
}

const fonts: ReturnType<typeof extendTheme>["fonts"] = {
	heading: "Muli",
	body: "Poppins",
}

const theme = extendTheme({ config, colors, fonts, components: { Button, Card, FormError, FormLabel, Heading, Input, Modal, Tooltip } })

export default theme
