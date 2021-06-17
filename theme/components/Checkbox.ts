import { extendTheme } from "@chakra-ui/react"

export const Checkbox: ReturnType<typeof extendTheme>["components"]["Checkbox"] = {
	baseStyle: {
		control: {
			borderColor: "brand.orange",
			_checked: {
				borderColor: "brand.orange",
				bg: "brand.orange",
				color: "brand.dark",
				_hover: {
					borderColor: "brand.orangeDark",
					bg: "brand.orangeDark",
					color: "brand.light",
				},
			},
			_focus: {
				boxShadow: "none",
			},
		},
	},
}
