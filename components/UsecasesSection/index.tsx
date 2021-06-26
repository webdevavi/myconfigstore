import { Text } from "@chakra-ui/react"
import React from "react"
import { Section } from "../Section"
import { SectionContent } from "../SectionContent"
import { SectionHeader } from "../SectionHeader"
import { UsecasesContainer } from "../UsecasesContainer"

export const UsecasesSection: React.FC = () => (
	<Section id="why-use-myconfig">
		<SectionHeader>
			<span className="section__header">w</span>hy{" "}
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
				can be helpful in a dozen of usecases, let us tell you a few of them...
			</Text>
		</SectionContent>
		<UsecasesContainer />
	</Section>
)
