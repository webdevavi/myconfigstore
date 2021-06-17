import { Box, Container, Flex, useBreakpoint } from "@chakra-ui/react"
import { useSession } from "next-auth/client"
import React from "react"
import { DashboardNavbar, NavigationSidebar } from ".."

export const Dashboard: React.FC = ({ children }) => {
	const [session] = useSession()

	const breakpoint = useBreakpoint() ?? ""

	return (
		<Box minH="100vh">
			<DashboardNavbar user={session?.user} />
			<Container maxW="1440px" p="0" overflowX="hidden">
				<Flex w="full" h="full">
					{!/base/.test(breakpoint) && <NavigationSidebar />}
					<Flex as="main" flex={1} flexDir="column" alignItems="flex-start" w="full" h="full" p="4">
						{children}
					</Flex>
				</Flex>
			</Container>
		</Box>
	)
}
