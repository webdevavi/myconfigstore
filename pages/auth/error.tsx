import { Box, Container, Heading, StackProps, Text, VStack } from "@chakra-ui/react"
import { AnimatedLogo, DefaultNavbar, Footer } from "@components"
import { NextPageWithSEO } from "@lib/types"
import { motion, MotionProps } from "framer-motion"
import { useRouter } from "next/router"
import React from "react"
import { stripHtml } from "string-strip-html"

const MotionVStack = motion<Omit<StackProps, "transition"> & MotionProps>(VStack as any)

const AuthErrorPage: NextPageWithSEO = () => {
	const {
		query: { error = "Something unexpected occurred!" },
	} = useRouter()

	return (
		<Box as="main" bg="brand.dark" minH="100vh">
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
					<Heading color="brand.error">Sign In Error</Heading>
					<Text fontSize="xl" color="brand.error" mt="4" textAlign="center">
						&quot;{stripHtml(error as string).result}&quot;
					</Text>
				</MotionVStack>
			</Container>
			<Footer />
		</Box>
	)
}

AuthErrorPage.seo = {
	title: "Sign In Error",
}

export default AuthErrorPage
