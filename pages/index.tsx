import { Box } from "@chakra-ui/react"
import { DefaultNavbar, Footer, Hero, WithAuth } from "@components"
import { NextPageWithSEO } from "@lib/types"
import React from "react"

const Home: NextPageWithSEO = () => {
	return (
		<Box as="main" bg="brand.dark">
			<DefaultNavbar />
			<Hero />
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
