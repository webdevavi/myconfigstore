import { Button, ButtonProps, HStack, Icon, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import { IconType } from "react-icons"

interface NavigationButtonProps {
	isActive?: boolean
	icon: IconType
	href: string
}

export const NavigationButton: React.FC<NavigationButtonProps & ButtonProps> = ({ isActive, children, icon, href, ...props }) => {
	return (
		<NextLink href={href} passHref>
			<Button
				as={Link}
				href={href}
				w="full"
				rounded="none"
				bg="brand.orangeLightest"
				color="brand.orange"
				p="2em"
				borderLeft="4px solid"
				borderColor={isActive ? "brand.orange" : "brand.orangeLightest"}
				_hover={{
					bg: "brand.orangeLightest",
					borderColor: "brand.orangeLight",
				}}
				_focus={{
					bg: "brand.orangeLightest",
					borderColor: "brand.orangeLight",
					outlineColor: "transparent",
				}}
				{...props}
			>
				<HStack w="full" justifyContent={{ base: "center", lg: "flex-start" }} spacing="4">
					<Icon as={icon} fontSize="2xl" />
					<Text fontFamily="Muli" fontSize="lg" fontWeight="black" d={{ base: "none", lg: "block" }}>
						{children}
					</Text>
				</HStack>
			</Button>
		</NextLink>
	)
}
