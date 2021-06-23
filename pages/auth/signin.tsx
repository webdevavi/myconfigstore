import { Box, BoxProps, Button, Container, StackProps, VStack } from "@chakra-ui/react"
import { AnimatedLogo, DefaultNavbar, Footer, WithAuth } from "@components"
import { NextPageWithSEO } from "@lib/types"
import { motion, MotionProps } from "framer-motion"
import { signIn } from "next-auth/client"
import React from "react"
import { useMutation } from "react-query"

const MotionVStack = motion<Omit<StackProps, "transition"> & MotionProps>(VStack as any)
const MotionBox = motion<Omit<BoxProps, "transition"> & MotionProps>(Box as any)

const SigninPage: NextPageWithSEO = () => {
	const { mutateAsync, isLoading } = useMutation("signin", (provider: string) => signIn(provider))

	const mutateSignin = (provider: string) => () => mutateAsync(provider)

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
					<MotionBox w="full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1 }}>
						<Button
							bg="#161B22"
							color="brand.light"
							w="full"
							fontSize={{ base: "xl", md: "2xl" }}
							py="1.5em"
							onClick={mutateSignin("github")}
							isLoading={isLoading}
						>
							Sign in with GitHub
						</Button>
					</MotionBox>
					<MotionBox w="full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2 }}>
						<Button
							bg="facebook.500"
							color="brand.light"
							w="full"
							fontSize={{ base: "xl", md: "2xl" }}
							py="1.5em"
							onClick={mutateSignin("facebook")}
							isLoading={isLoading}
						>
							Sign in with Facebook
						</Button>
					</MotionBox>
					<MotionBox w="full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.4 }}>
						<Button
							bg="#EB5530"
							color="brand.light"
							w="full"
							fontSize={{ base: "xl", md: "2xl" }}
							py="1.5em"
							onClick={mutateSignin("auth0")}
							isLoading={isLoading}
						>
							Sign in with Auth0
						</Button>
					</MotionBox>
				</MotionVStack>
			</Container>
			<Footer />
		</Box>
	)
}

SigninPage.seo = {
	title: "Sign In",
	canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/auth/signin`,
}

export default WithAuth(SigninPage, { redirect: "onAuth", redirectTo: "/user/stores" })
