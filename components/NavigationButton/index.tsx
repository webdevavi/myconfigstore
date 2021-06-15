import { Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons"

interface NavigationButtonProps {
	isActive?: boolean
	icon: IconType
}

export const NavigationButton: React.FC<NavigationButtonProps & ButtonProps> = ({ isActive, children, icon, ...props }) => {
	return (
		<Button
			w="full"
			rounded="none"
			bg="#392C1D"
			color="brand.orange"
			p="2em"
			border="2px solid"
			borderColor={isActive ? "brand.orange" : "#392C1D"}
			_hover={{
				bg: "#392C1D",
				borderColor: "brand.orange",
			}}
			_focus={{
				bg: "#392C1D",
				borderColor: "brand.orange",
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
	)
}
