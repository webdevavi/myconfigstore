import { Box, Container, Grid, GridProps, Heading, Text, VStack } from "@chakra-ui/react"
import { useCurrentUserQuery } from "@hooks"
import React from "react"
import { NavLink } from "../Navbar/default/NavLink"
import { TextLogo } from "../Logo"

export const Footer: React.FC<GridProps> = (props) => {
	const { data: user, isLoading } = useCurrentUserQuery()

	return (
		<Box as="footer" id="footer" bg="brand.dark2">
			<Container as={VStack} alignItems="stretch" maxW="1280px" py="8" spacing="8">
				<Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={{ base: 8, md: 4 }} {...props}>
					<VStack flex="1">
						<Heading color="brand.orange" opacity="0.8" fontSize="md">
							Navigation
						</Heading>
						<VStack>
							<NavLink href="/">Home</NavLink>
							<NavLink href="/pricing">Pricing</NavLink>
							<NavLink href="https://docs.myconfig.store">Docs</NavLink>
							{!isLoading && user ? <NavLink href="/user/billing">Billing</NavLink> : <NavLink href="/auth/signin">Sign In</NavLink>}
						</VStack>
					</VStack>
					<VStack flex="1">
						<Heading color="brand.orange" opacity="0.8" fontSize="md">
							Terms & Policies
						</Heading>
						<VStack>
							<NavLink href="/terms">Terms & Conditions</NavLink>
							<NavLink href="/privacy">Privacy Policy</NavLink>
							<NavLink href="/cookies">Cookies Policy</NavLink>
							<NavLink href="/refund#Refund%20Policy">Refund Policy</NavLink>
							<NavLink href="/refund#Cancellation%20Policy">Cancellation Policy</NavLink>
						</VStack>
					</VStack>
					<VStack flex="1">
						<Heading color="brand.orange" opacity="0.8" fontSize="md">
							Contact Us
						</Heading>

						<VStack>
							<NavLink href="/contact">Contact</NavLink>
							<NavLink href="https://www.twitter.com/myconfigstore">Twitter</NavLink>
							<NavLink href="https://www.facebook.com/myconfigstore">Facebook</NavLink>
						</VStack>
					</VStack>
					<VStack flex="1">
						<Heading color="brand.orange" opacity="0.8" fontSize="md">
							Contact Me
						</Heading>

						<VStack>
							<NavLink href="https://www.twitter.com/webdevavi">Twitter</NavLink>
							<NavLink href="https://www.facebook/com/webdevavi">Facebook</NavLink>
							<NavLink href="https://www.poly.work/avinash">Polywork</NavLink>
						</VStack>
					</VStack>
				</Grid>
				<VStack>
					<TextLogo textAlign="center" />
					<Text fontSize="sm" textAlign="center" opacity="0.6">
						&copy; {new Date().getFullYear()} An Open Source Project
					</Text>
				</VStack>
			</Container>
		</Box>
	)
}
