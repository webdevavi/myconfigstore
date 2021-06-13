import { Box, Container, HStack } from "@chakra-ui/react"
import React from "react"
import { TextLogo } from "../../Logo"
import { NavLinks } from "./NavLinks"

export const DefaultNavbar = () => {
	return (
		<Box bg="transparent">
			<Container as={HStack} maxW="container.xl" py="4" justifyContent="space-between">
				<TextLogo />
				<NavLinks />
			</Container>
		</Box>
	)
}
