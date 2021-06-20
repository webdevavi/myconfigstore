import { Box, Container, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { useCurrentUserQuery } from "@hooks"
import React from "react"
import { NavLink } from "../Navbar/default/NavLink"
import { TextLogo } from "../Logo"

export const Footer: React.FC = () => {
	const { data: user, isLoading } = useCurrentUserQuery()

	return (
		<Box as="footer" id="footer" bg="brand.dark2">
			<Container maxW="1280px" py="8">
				<Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }} gap={{ base: 8, md: 4 }}>
					<VStack flex="1" alignItems="flex-start">
						<TextLogo fontSize="3xl" />
						<Text>&copy; {new Date().getFullYear()} An Open Source Project</Text>
					</VStack>
					<VStack flex="1" alignItems="flex-start">
						<Heading color="brand.orange" opacity="0.8" fontSize="2xl">
							Navigation
						</Heading>
						<VStack alignItems="flex-start">
							<NavLink href="/">Home</NavLink>
							<NavLink href="/pricing">Pricing</NavLink>
							<NavLink href="/docs">Docs</NavLink>
							{!isLoading && user ? <NavLink href="/user/billing">Billing</NavLink> : <NavLink href="/auth/signin">Sign In</NavLink>}
						</VStack>
					</VStack>
					<VStack flex="1" alignItems="flex-start">
						<Heading color="brand.orange" opacity="0.8" fontSize="2xl">
							Terms & Policies
						</Heading>
						<VStack alignItems="flex-start">
							<NavLink href="/terms">Terms & Conditions</NavLink>
							<NavLink href="/privacy">Privacy Policy</NavLink>
							<NavLink href="/cookies">Cookies Policy</NavLink>
							<NavLink href="/refund#Refund%20Policy">Refund Policy</NavLink>
							<NavLink href="/refund#Cancellation%20Policy">Cancellation Policy</NavLink>
						</VStack>
					</VStack>
					<VStack flex="1" alignItems="flex-start">
						<Heading color="brand.orange" opacity="0.8" fontSize="2xl">
							Contact Us
						</Heading>

						<VStack alignItems="flex-start">
							<NavLink href="https://www.twitter.com/myconfigstore">Twitter</NavLink>
							<NavLink href="https://www.facebook.com/myconfigstore">Facebook</NavLink>
						</VStack>
					</VStack>
					<VStack flex="1" alignItems="flex-start">
						<Heading color="brand.orange" opacity="0.8" fontSize="2xl">
							Contact Me
						</Heading>

						<VStack alignItems="flex-start">
							<NavLink href="https://www.twitter.com/webdevavi">Twitter</NavLink>
							<NavLink href="https://www.facebook/com/webdevavi">Facebook</NavLink>
							<NavLink href="https://www.poly.work/avinash">Polywork</NavLink>
						</VStack>
					</VStack>
				</Grid>
			</Container>
		</Box>
	)
}
