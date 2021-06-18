import { extendTheme } from "@chakra-ui/react"

export const Progress: ReturnType<typeof extendTheme>["components"]["Progress"] = {
	baseStyle: {
		track: {
			bg: "brand.dark",
		},
		filledTrack: {
			bg: "brand.orange",
		},
	},
}
