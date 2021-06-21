import { extendTheme } from "@chakra-ui/react"

export const Select: ReturnType<typeof extendTheme>["components"]["Select"] = {
	baseStyle: {
		field: {
			"> option, > optgroup": {
				bg: "brand.dark2",
			},
		},
	},
}
