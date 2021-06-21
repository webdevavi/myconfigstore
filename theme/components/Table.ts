import { extendTheme } from "@chakra-ui/react"

export const Table: ReturnType<typeof extendTheme>["components"]["Table"] = {
	baseStyle: {
		th: {
			fontFamily: "heading",
			fontWeight: "black",
			textTransform: "none",
			letterSpacing: "wider",
			textAlign: "center",
			color: "brand.orange",
		},
		td: {
			textAlign: "center",
			fontFamily: "Muli",
		},
	},
	sizes: {
		lg: {
			th: {
				fontSize: "xl",
			},
		},
	},
	variants: {
		simple: {
			th: {
				color: "brand.orange",
				borderColor: "brand.orange",
			},
			td: {
				borderColor: "brand.orange",
			},
		},
	},
	defaultProps: {
		size: "lg",
	},
}
