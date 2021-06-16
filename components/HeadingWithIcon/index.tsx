import { Heading, HStack, Icon, StackProps, TypographyProps } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons"

interface HeadingWithIconProps {
	icon: IconType
	fontSize?: TypographyProps["fontSize"]
}

export const HeadingWithIcon: React.FC<HeadingWithIconProps & StackProps> = ({ icon, children, fontSize = "2xl", ...props }) => (
	<HStack {...props}>
		<Icon as={icon} color="brand.orange" fontSize={fontSize} />
		<Heading color="brand.orange" fontSize={fontSize}>
			{children}
		</Heading>
	</HStack>
)
