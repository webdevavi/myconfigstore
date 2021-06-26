import { Heading, HeadingProps, HStack, Img } from "@chakra-ui/react"
import React from "react"

export const TextLogo: React.FC<HeadingProps> = ({ fontSize = "xl", ...props }) => {
	const imgWidth = {
		xs: 4,
		sm: 6,
		md: 8,
		lg: 10,
		xl: 12,
		"2xl": 14,
		"3xl": 16,
		"4xl": 18,
		"5xl": 20,
		"6xl": 22,
		"7xl": 24,
		"8xl": 26,
		"9xl": 28,
	}

	return (
		<HStack>
			<Img src="/myconfigstore-logo-196x196.png" alt="Logo" width={imgWidth[fontSize as keyof typeof imgWidth] ?? 12} />
			<Heading as="span" color="brand.orange" fontSize={fontSize} {...props}>
				myconfig
			</Heading>
		</HStack>
	)
}
