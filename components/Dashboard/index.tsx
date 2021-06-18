import { Box, Container, Flex, useBreakpoint } from "@chakra-ui/react"
import React from "react"
import { DashboardNavbar, NavigationSidebar } from ".."
import { useCurrentUser } from "../../lib/hooks/session"

export const Dashboard: React.FC = ({ children }) => {
	const { currentUser } = useCurrentUser()

	const breakpoint = useBreakpoint() ?? ""

	return (
		<Box minH="100vh">
			<DashboardNavbar user={currentUser} />
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
