import { Container } from "@chakra-ui/react"
import { DefaultNavbar, PricingContainer } from "@components"
import { NextPage } from "next"
import Head from "next/head"
import React from "react"

const PricingPage: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Pricing | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<DefaultNavbar />
			<Container maxW="1280px">
				<PricingContainer />
			</Container>
		</div>
	)
}

export default PricingPage
