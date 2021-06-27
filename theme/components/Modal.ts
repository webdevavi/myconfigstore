import { extendTheme } from "@chakra-ui/react"

export const Modal: ReturnType<typeof extendTheme>["components"]["Modal"] = {
	baseStyle: {
		header: {
			textAlign: "center",
			fontSize: { base: "xl", md: "2xl" },
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
			top: { base: 3, md: 4 },
			fontSize: { base: "lg", md: "xl" },
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
	variants: {
		drawer: {
			dialogContainer: {
				height: "auto !important",
				top: "60px",
				bottom: "0px",
			},
			dialog: {
				alignSelf: "flex-end",
				m: 0,
			},
		},
	},
	defaultProps: {
		size: "xl",
		isCentered: true,
	},
}
