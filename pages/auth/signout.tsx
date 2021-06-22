import { Box, Container, StackProps, Text, VStack } from "@chakra-ui/react"
import { AnimatedLogo, DefaultNavbar, Footer, WithAuth } from "@components"
import { useCurrentUser } from "@hooks"
import { motion, MotionProps } from "framer-motion"
import { NextPage } from "next"
import { signOut } from "next-auth/client"
import Head from "next/head"
import React, { useEffect } from "react"
import { useMutation } from "react-query"

const MotionVStack = motion<Omit<StackProps, "transition"> & MotionProps>(VStack as any)

const SignoutPage: NextPage<unknown> = () => {
	const { removeUser } = useCurrentUser()

	const { mutateAsync, isError, error, isLoading } = useMutation("signout", () => signOut(), {
		onSuccess: removeUser,
	})

	const mutateSignOut = () => mutateAsync()

	useEffect(() => {
		mutateSignOut()
	}, [])

	return (
		<div>
			<Head>
				<title>Sign Out | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

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
		</div>
	)
}

export default WithAuth(SignoutPage, { redirect: "onUnauth" })
