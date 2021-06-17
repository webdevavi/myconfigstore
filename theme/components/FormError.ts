import { extendTheme } from "@chakra-ui/react"

export const FormError: ReturnType<typeof extendTheme>["components"]["FormError"] = {
	baseStyle: {
		text: {
			color: "brand.error",
		},
		icon: {
			color: "brand.error",
		},
	},
}
