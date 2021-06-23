import { Container } from "@chakra-ui/react"
import { DefaultNavbar, Footer, PricingContainer } from "@components"
import { NextPageWithSEO } from "@lib/types"
import React from "react"

const PricingPage: NextPageWithSEO = () => {
	return (
		<div>
			<DefaultNavbar />
			<Container maxW="1280px">
				<PricingContainer />
			</Container>
			<Footer />
		</div>
	)
}

PricingPage.seo = {
	title: "Pricing",
	canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/pricing`,
}

export default PricingPage
