import { Text } from "@chakra-ui/react"
import { Section, SectionHeader } from "@components"
import React from "react"

export const DescriptionSection = () => {
	return (
		<Section>
			<SectionHeader>
				<span className="section__header">w</span>hat&apos;s{" "}
				<Text as="span" color="brand.orangeDark">
					my
				</Text>
				config
			</SectionHeader>
			<Text fontWeight="bold" textAlign="center" maxW="3xl" mx="auto" lineHeight="125%" fontSize={{ base: "xl", md: "3xl" }} color="brand.light">
				<Text as="span" color="brand.orange">
					myconfigstore
				</Text>{" "}
				is a secure database which lets you store simple key-value pair config variables in the cloud and securely access it with a REST API endpoint
				uniquely generated just for you.
			</Text>
		</Section>
	)
}
