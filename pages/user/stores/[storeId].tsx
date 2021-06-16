import { Box, Container, Flex } from "@chakra-ui/react"
import { NextPage } from "next"
import { useSession } from "next-auth/client"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { DashboardNavbar, NavigationSidebar, FullStoreContainer, WithAuth } from "../../../components"

const StorePage: NextPage = () => {
	const [session] = useSession()

	const {
		query: { storeId },
	} = useRouter()

	return (
		<div>
			<Head>
				<title>{storeId} - Store | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box bg="brand.dark" minH="100vh">
				<DashboardNavbar user={session?.user} />
				<Container maxW="1440px" p="0" overflowX="hidden">
					<Flex>
						<NavigationSidebar />
						<Flex as="main" flex={1} flexDir="column" alignItems="flex-start" w="full" h="full">
							<Flex w="full" h="full" p="4">
								<FullStoreContainer storeId={storeId as string} />
							</Flex>
						</Flex>
					</Flex>
				</Container>
			</Box>
		</div>
	)
}

export default WithAuth(StorePage, { redirect: "onUnauth" })
