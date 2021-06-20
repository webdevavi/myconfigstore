import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { Breadcrumb, Button, Card, Checkbox, FormError, FormLabel, Heading, Input, Link, Modal, Progress, Table, Tooltip } from "./components"

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

const styles = {
	global: {
		body: {
			bg: "brand.dark",
			color: "brand.light",
		},
	},
}

const theme = extendTheme({
	config,
	colors,
	fonts,
	styles,
	components: { Breadcrumb, Button, Card, Checkbox, FormError, FormLabel, Heading, Input, Link, Modal, Progress, Table, Tooltip },
})

export default theme
