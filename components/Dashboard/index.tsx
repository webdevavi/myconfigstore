import { Box, Container, Flex, useBreakpoint, VStack } from "@chakra-ui/react"
import { useCurrentUser } from "@hooks"
import React from "react"
import { Footer } from "../Footer"
import { DashboardNavbar } from "../Navbar"
import { NavigationSidebar } from "../Sidebar"

export const Dashboard: React.FC = ({ children }) => {
	const { currentUser } = useCurrentUser()

	const breakpoint = useBreakpoint() ?? ""

	return (
		<Box minH="100vh">
			<DashboardNavbar user={currentUser} />
			<Container maxW="1440px" p="0" overflowX="hidden">
				<Flex w="full" h="full">
					{!/base/.test(breakpoint) && <NavigationSidebar />}
					<VStack flex={1} w="full" f="full" alignItems="stretch">
						<Flex as="main" flexDir="column" alignItems="flex-start" w="full" h="full" p="4" pb="16">
							{children}
						</Flex>
						<Footer templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} />
					</VStack>
				</Flex>
			</Container>
		</Box>
	)
}
