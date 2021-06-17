import { extendTheme } from "@chakra-ui/react"

export const Tooltip: ReturnType<typeof extendTheme>["components"]["Tooltip"] = {
	baseStyle: {
		"--tooltip-bg": "colors.brand.orange",
		fontWeight: "bold",
	},
}
