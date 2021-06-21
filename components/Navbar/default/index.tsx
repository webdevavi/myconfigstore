import { Box, Container, HStack } from "@chakra-ui/react"
import React from "react"
import { DrawerToggleButton } from "../../DrawerToggleButton"
import { TextLogo } from "../../Logo"
import { NavLinks } from "./NavLinks"

export const DefaultNavbar = () => {
	return (
		<Box bg="brand.dark" zIndex="99999">
			<Container as={HStack} maxW="container.xl" py="4" justifyContent="space-between">
				<TextLogo />
				<Box d={{ base: "none", md: "flex" }}>
					<NavLinks />
				</Box>
				<DrawerToggleButton d={{ base: "flex", md: "none" }} />
			</Container>
		</Box>
	)
}
