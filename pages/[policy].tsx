import { Box, Container, Heading } from "@chakra-ui/react"
import { DefaultNavbar, Markdown } from "@components"
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
					<Heading as="h1" mb="4">
						{title}
					</Heading>
					<Markdown>{markdown}</Markdown>
				</Container>
			</Box>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const arr: string[] = ["terms", "privacy", "refund", "cancellation", "cookies"]
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
		title = "Refund Policy"
	}

	if (policy === "cancellation") {
		title = "Cancellation Policy"
	}

	if (policy === "cookies") {
		title = "Cookies Policy"
	}

	const { default: markdown } = await require(`../policies/${String(policy).toUpperCase()}.md`)

	return { props: { markdown, title } }
}

export default TermsPage
