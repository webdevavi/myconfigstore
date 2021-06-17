import { extendTheme } from "@chakra-ui/react"

export const FormLabel: ReturnType<typeof extendTheme>["components"]["FormLabel"] = {
	baseStyle: {
		fontFamily: "Muli",
		fontSize: "lg",
		fontWeight: "black",
		color: "brand.orange",
	},
}
