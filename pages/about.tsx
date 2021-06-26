import { Box, Container, Divider, Heading } from "@chakra-ui/react"
import { DefaultNavbar, Footer, Markdown } from "@components"
import { NextPageWithSEO } from "@lib/types"
import { GetStaticProps } from "next"
import React from "react"

interface AboutUsPageProps {
	markdown: string
}

const AboutUsPage: NextPageWithSEO<AboutUsPageProps> = ({ markdown }) => (
	<Box minH="100vh">
		<DefaultNavbar />
		<Container maxW="960px" py="8">
			<Heading as="h1" mb="4" color="brand.orange">
				About Us
			</Heading>
			<Divider />
			<Box py="4">
				<Markdown>{markdown}</Markdown>
			</Box>
		</Container>
		<Footer />
	</Box>
)

AboutUsPage.seo = {
	title: "About Us",
}

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async () => {
	const { default: markdown } = await require(`../markdown/ABOUT.md`)

	return { props: { markdown } }
}

export default AboutUsPage
