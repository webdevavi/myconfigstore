import { extendTheme } from "@chakra-ui/react"

export const Link: ReturnType<typeof extendTheme>["components"]["Link"] = {
	baseStyle: {
		color: "brand.orange",
		opacity: "0.8",
		_hover: {
			opacity: 1,
			textDecor: "underline",
			textUnderlineOffset: "0.2em",
		},
		_focus: {
			opacity: 1,
			textDecor: "underline",
			textUnderlineOffset: "0.2em",
			boxShadow: "none",
			outlineWidth: "0.2em",
			outlineStyle: "solid",
			outlineColor: "brand.orange",
			outlineOffset: "0.2em",
		},
	},
}
