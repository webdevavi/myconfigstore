import { Box, Container, Icon, Heading, StackProps, Link, Text, VStack } from "@chakra-ui/react"
import { DefaultNavbar, AnimatedLogo, Footer } from "@components"
import { NextPageWithSEO } from "@lib/types"
import { motion, MotionProps } from "framer-motion"
import React from "react"
import { FaEnvelope, FaTwitter, FaFacebook, FaPhoneAlt, FaHome } from "react-icons/fa"

const MotionVStack = motion<Omit<StackProps, "transition"> & MotionProps>(VStack as any)

const ContactPage: NextPageWithSEO = () => {
	return (
		<Box as="main" minH="100vh">
			<DefaultNavbar />
			<Container as={VStack} maxW="container.sm" spacing="8" pb="16">
				<AnimatedLogo />
				<MotionVStack
					w="full"
					bg="rgba(255, 255, 255, 0.05)"
					p={{ base: 4, md: 12 }}
					spacing={{ base: 4, md: 8 }}
					boxShadow="2xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<Heading color="brand.orange">Contact Us</Heading>
					<Box d="flex" flexWrap="wrap" justifyContent="center" spacing="8">
						<VStack flex="1" m="4">
							<Icon as={FaTwitter} fontSize="3xl" color="twitter.500" />
							<Link color="brand.light" href="https://twitter.com/myconfigstore">
								@myconfigstore
							</Link>
						</VStack>

						<VStack flex="1" m="4">
							<Icon as={FaFacebook} fontSize="3xl" color="facebook.400" />
							<Link color="brand.light" href="https://facebook.com/myconfigstore">
								@myconfigstore
							</Link>
						</VStack>

						<VStack flex="1" m="4">
							<Icon as={FaPhoneAlt} fontSize="3xl" color="telegram.500" />
							<Link color="brand.light" href="tel:+918580309667">
								+918580309667
							</Link>
						</VStack>
					</Box>
					<VStack flex="1" m="2">
						<Icon as={FaEnvelope} fontSize="3xl" color="red.400" />
						<Link color="brand.light" href="mailto:myconfigstore@gmail.com">
							myconfigstore@gmail.com
						</Link>
					</VStack>
					<VStack flex="1" m="2">
						<Icon as={FaHome} fontSize="3xl" color="brand.orange" />
						<Text as="p" textAlign="center" opacity="0.8" whiteSpace="pre-line">
							<strong>Mr. Avinash Sinha</strong>
							<br />
							Road No. 18, Quarter No. E/268
							<br />
							P.T.P.S. Patratu, Ramgarh - 829119
							<br />
							Jharkhand - India 🇮🇳
						</Text>
					</VStack>
				</MotionVStack>
			</Container>
			<Footer />
		</Box>
	)
}

ContactPage.seo = {
	title: "Contact Us",
}

export default ContactPage
