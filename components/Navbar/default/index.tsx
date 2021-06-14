import { Box, Container, HStack } from "@chakra-ui/react"
import React from "react"
import { TextLogo } from "../../Logo"
import { NavLinks } from "./NavLinks"

export const DefaultNavbar = () => {
	return (
		<Box bg="transparent">
			<Container as={HStack} maxW="container.xl" py="4" justifyContent="space-between">
				<TextLogo />
				<HStack spacing="6" d={{ base: "none", md: "flex" }}>
					<NavLinks />
				</HStack>
			</Container>
		</Box>
	)
}
