import { Box, Container, StackProps, Text, VStack } from "@chakra-ui/react"
import { AnimatedLogo, DefaultNavbar, Footer, WithAuth } from "@components"
import { useCurrentUser } from "@hooks"
import { NextPageWithSEO } from "@lib/types"
import { motion, MotionProps } from "framer-motion"
import { signOut } from "next-auth/client"
import React, { useEffect } from "react"
import { useMutation } from "react-query"

const MotionVStack = motion<Omit<StackProps, "transition"> & MotionProps>(VStack as any)

const SignoutPage: NextPageWithSEO = () => {
	const { removeUser } = useCurrentUser()

	const { mutateAsync, isError, error, isLoading } = useMutation("signout", () => signOut(), {
		onSuccess: removeUser,
	})

	const mutateSignOut = () => mutateAsync()

	useEffect(() => {
		mutateSignOut()
	}, [])

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
					<Text fontSize="2xl" fontWeight="bold" color="brand.light" textAlign="center">
						{isLoading ? "You are being signed out..." : isError ? (error as any)?.message : "You have been signed out."}
					</Text>
				</MotionVStack>
			</Container>
			<Footer />
		</Box>
	)
}

SignoutPage.seo = {
	title: "Sign Out",
	canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/auth/signout`,
}

export default WithAuth(SignoutPage, { redirect: "onUnauth" })
