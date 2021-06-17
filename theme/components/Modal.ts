import { extendTheme } from "@chakra-ui/react"

export const Modal: ReturnType<typeof extendTheme>["components"]["Modal"] = {
	baseStyle: {
		header: {
			textAlign: "center",
			fontSize: "2xl",
			color: "brand.orange",
		},
		dialog: {
			bg: "brand.dark2",
			borderRadius: 0,
			maxW: "2xl",
		},
		closeButton: {
			color: "brand.orange",
			size: "xs",
			top: "4",
			fontSize: "xl",
			_focus: {
				boxShadow: "none",
				outlineColor: "brand.orange",
			},
		},
		footer: {
			justifyContent: "center",
		},
		body: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			p: {
				base: 2,
				md: 4,
			},
		},
	},
	defaultProps: {
		size: "xl",
		isCentered: true,
	},
}
