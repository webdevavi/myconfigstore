import { Box } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import React from "react"
import { DefaultNavbar, Hero, WithAuth } from "../components"

const Home: NextPage = () => (
	<div>
		<Head>
			<title>Home | myconfig.store</title>
			<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Box as="main" bg="brand.dark">
			<DefaultNavbar />
			<Hero />
		</Box>
	</div>
)

export default WithAuth(Home, { redirect: "onAuth", redirectTo: "/stores" })
