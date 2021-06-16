import { extendTheme } from "@chakra-ui/react"

export const Breadcrumb: ReturnType<typeof extendTheme>["components"]["Breadcrumb"] = {
	baseStyle: {
		link: {
			color: "brand.orange",
			opacity: 0.6,
			_hover: {
				opacity: 0.8,
			},
			_focus: {
				opacity: 0.8,
			},
		},
		separator: {
			color: "brand.orange",
			opacity: 0.8,
		},
	},
}
