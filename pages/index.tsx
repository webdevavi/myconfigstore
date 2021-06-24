import { Box, Container, VStack } from "@chakra-ui/react"
import { DefaultNavbar, DescriptionSection, Footer, Hero, InternalUseSection, UsecasesSection, WithAuth } from "@components"
import { NextPageWithSEO } from "@lib/types"
import React from "react"

const Home: NextPageWithSEO = () => {
	return (
		<Box as="main">
			<DefaultNavbar />
			<Hero />
			<Container maxW="1280px">
				<VStack w="full" alignItems="stretch" spacing="16" py="8">
					<DescriptionSection />
					<UsecasesSection />
					<InternalUseSection />
				</VStack>
			</Container>
			<Footer />
		</Box>
	)
}

Home.seo = {
	title: "Home",
	twitter: {
		cardType: "summary_large_image",
	},
}

export default WithAuth(Home, { redirect: "onAuth", redirectTo: "/user/stores" })
