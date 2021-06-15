import { Box, Container, Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import { Session } from "next-auth"
import { getSession, useSession } from "next-auth/client"
import Head from "next/head"
import React from "react"
import { DashboardNavbar, NavigationSidebar, WithAuth } from "../../components"

interface StoresPageProps {
	session: Session | null
	stores: []
}

const StoresPage: NextPage<StoresPageProps> = ({ stores }) => {
	const [session, isLoading] = useSession()

	return (
		<div>
			<Head>
				<title>Stores | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box bg="brand.dark" minH="100vh">
				<DashboardNavbar user={session?.user} />
				<Container maxW="1440px" p="0" overflowX="hidden">
					<Flex>
						<NavigationSidebar />
						<Flex as="main" flex={1} flexDir="column" alignItems="flex-start" w="full" h="full">
							<Flex w="full" h="full"></Flex>
						</Flex>
					</Flex>
				</Container>
			</Box>
		</div>
	)
}

StoresPage.getInitialProps = async (ctx) => {
	const session = await getSession(ctx)

	return { session, stores: [] }
}

export default WithAuth(StoresPage as NextPage<unknown>, { redirect: "onUnauth" })
