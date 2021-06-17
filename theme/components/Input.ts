import { extendTheme } from "@chakra-ui/react"

export const Input: ReturnType<typeof extendTheme>["components"]["Input"] = {
	baseStyle: {
		field: {
			borderRadius: 0,
		},
	},
	variants: {
		filled: {
			field: {
				borderRadius: 0,
				bg: "brand.dark",
				_hover: {
					bg: "brand.dark2",
				},
				_focus: {
					bg: "brand.dark2",
					borderColor: "brand.orange",
				},
				_invalid: {
					borderColor: "brand.error",
				},
			},
			addon: {
				rounded: "none",
			},
		},
	},
	defaultProps: {
		variant: "filled",
	},
}
