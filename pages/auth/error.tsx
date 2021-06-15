import { Box, Container, Heading, StackProps, Text, VStack } from "@chakra-ui/react"
import { motion, MotionProps } from "framer-motion"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { AnimatedLogo, DefaultNavbar } from "../../components"
import { stripHtml } from "string-strip-html"

const MotionVStack = motion<Omit<StackProps, "transition"> & MotionProps>(VStack as any)

const AuthErrorPage: NextPage<unknown> = () => {
	const {
		query: { error = "Something unexpected occurred!" },
	} = useRouter()

	return (
		<div>
			<Head>
				<title>Sign In Error | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box as="main" bg="brand.dark" minH="100vh">
				<DefaultNavbar />
				<Container as={VStack} maxW="container.sm" spacing="8">
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
						<Heading fontWeight="black" color="red.400">
							Sign In Error
						</Heading>
						<Text fontSize="2xl" color="red.300" mt="4">
							&quot;{stripHtml(error as string).result}&quot;
						</Text>
					</MotionVStack>
				</Container>
			</Box>
		</div>
	)
}

export default AuthErrorPage
