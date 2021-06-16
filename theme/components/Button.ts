import { extendTheme } from "@chakra-ui/react"

export const Button: ReturnType<typeof extendTheme>["components"]["Button"] = {
	baseStyle: {
		rounded: "none",
		py: "1.1em",
		px: "2em",
		paddingX: "2em",
		fontFamily: "Muli",
		fontWeight: "black",
		height: "fit-content",
		_focus: {
			boxShadow: "none",
		},
	},
	sizes: {
		sm: {
			fontSize: "sm",
		},
		md: {
			fontSize: "md",
		},
		lg: {
			fontSize: "lg",
		},
		xl: {
			fontSize: "xl",
		},
	},
	variants: {
		outline: {
			border: "2px solid",
			borderColor: "brand.orange",
			color: "brand.orange",
			_hover: {
				bg: "brand.orangeDark",
				borderColor: "brand.orangeDark",
				color: "brand.light",
			},
			_focus: {
				bg: "brand.orangeDark",
				borderColor: "brand.orangeDark",
				color: "brand.light",
			},
		},
		solid: {
			bg: "brand.orange",
			color: "brand.dark",
			_hover: {
				bg: "brand.orangeDark",
				color: "brand.light",
			},
			_focus: {
				outline: "2px solid",
				outlineColor: "brand.orangeDark",
				border: "none",
				bg: "brand.orangeDark",
				color: "brand.light",
			},
		},
		link: {
			color: "brand.orange",
			opacity: 0.8,
			_hover: {
				opacity: 1,
				textDecoration: "underline",
				textUnderlineOffset: "0.2em",
			},
			_focus: {
				opacity: 1,
				textDecoration: "underline",
				textUnderlineOffset: "0.2em",
			},
		},
	},
	defaultProps: {
		size: "lg",
		variant: "solid",
	},
}
