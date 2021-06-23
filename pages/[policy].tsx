import { Box, Container, Divider, Heading } from "@chakra-ui/react"
import { DefaultNavbar, Footer, Markdown } from "@components"
import { NextPageWithSEO } from "@lib/types"
import { GetStaticPaths, GetStaticProps } from "next"
import { NextSeo, NextSeoProps } from "next-seo"
import { ParsedUrlQuery } from "querystring"
import React from "react"

interface TermsPageProps {
	markdown: string
	seo: NextSeoProps
}

const TermsPage: NextPageWithSEO<TermsPageProps> = ({ markdown, seo }) => {
	return (
		<Box minH="100vh">
			<NextSeo {...seo} />
			<DefaultNavbar />
			<Container maxW="960px" py="8">
				<Heading as="h1" mb="4" color="brand.orange">
					{seo.title}
				</Heading>
				<Divider />
				<Box py="4">
					<Markdown>{markdown}</Markdown>
				</Box>
			</Container>
			<Footer />
		</Box>
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

	const seo: NextSeoProps = {
		title: "Terms & Conditions",
		canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/${policy}`,
	}

	if (policy === "privacy") {
		seo.title = "Privacy Policy"
	}

	if (policy === "refund") {
		seo.title = "Refund & Cancellation Policy"
	}

	if (policy === "cookies") {
		seo.title = "Cookies Policy"
	}

	TermsPage.seo = seo

	const { default: markdown } = await require(`../policies/${String(policy).toUpperCase()}.md`)

	return { props: { markdown, seo } }
}

export default TermsPage
