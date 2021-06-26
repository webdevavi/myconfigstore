import { Text } from "@chakra-ui/react"
import React from "react"
import { Section } from "../Section"
import { SectionContent } from "../SectionContent"
import { SectionHeader } from "../SectionHeader"

export const DescriptionSection = () => {
	return (
		<Section id="what-is-myconfig">
			<SectionHeader>
				<span className="section__header">w</span>hat&apos;s{" "}
				<Text as="span" color="brand.orangeDark">
					my
				</Text>
				config?
			</SectionHeader>
			<SectionContent>
				<Text fontWeight="bold" textAlign="center" maxW="3xl" mx="auto" lineHeight="125%" fontSize={{ base: "xl", md: "3xl" }} color="brand.light">
					<Text as="span" color="brand.orange">
						myconfig
					</Text>{" "}
					is a secure database which lets you store simple key-value pair config variables in the cloud and securely access it with a REST API
					endpoint uniquely generated just for you.
				</Text>
			</SectionContent>
		</Section>
	)
}
