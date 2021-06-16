import { extendTheme } from "@chakra-ui/react"

export const Heading: ReturnType<typeof extendTheme>["components"]["Heading"] = {
	baseStyle: {
		fontWeight: "black",
	},
}
