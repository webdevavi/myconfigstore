import { Box, Container, Divider, Heading } from "@chakra-ui/react"
import { DefaultNavbar, Markdown, Footer } from "@components"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import React from "react"

interface TermsPageProps {
	markdown: string
	title: string
}

const TermsPage: NextPage<TermsPageProps> = ({ markdown, title }) => {
	return (
		<div>
			<Head>
				<title>{title} | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box minH="100vh">
				<DefaultNavbar />
				<Container maxW="960px" py="8">
					<Heading as="h1" mb="4" color="brand.orange">
						{title}
					</Heading>
					<Divider />
					<Box py="4">
						<Markdown>{markdown}</Markdown>
					</Box>
				</Container>
				<Footer />
			</Box>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const arr: string[] = ["terms", "privacy", "refund", "cookies"]
	const paths = arr.map((policy) => {
		return {
			params: { policy },
		}
	})
	return { paths, fallback: false }
}

interface IParams extends ParsedUrlQuery {
	policy: string
}

export const getStaticProps: GetStaticProps<TermsPageProps, IParams> = async ({ params }) => {
	const { policy } = params!

	let title = "Terms & Conditions"

	if (policy === "privacy") {
		title = "Privacy Policy"
	}

	if (policy === "refund") {
		title = "Refund & Cancellation Policy"
	}

	if (policy === "cookies") {
		title = "Cookies Policy"
	}

	const { default: markdown } = await require(`../policies/${String(policy).toUpperCase()}.md`)

	return { props: { markdown, title } }
}

export default TermsPage
