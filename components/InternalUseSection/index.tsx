import { Link, Text } from "@chakra-ui/react"
import React from "react"
import { Section } from "../Section"
import { SectionContent } from "../SectionContent"
import { SectionHeader } from "../SectionHeader"

export const InternalUseSection = () => {
	return (
		<Section id="we-use-myconfig">
			<SectionHeader>
				<span className="section__header">w</span>e use{" "}
				<Text as="span" color="brand.orangeDark">
					my
				</Text>
				config internally
			</SectionHeader>
			<SectionContent>
				<Text fontWeight="bold" textAlign="center" maxW="3xl" mx="auto" lineHeight="125%" fontSize={{ base: "xl", md: "3xl" }} color="brand.light">
					we are using{" "}
					<Text as="span" color="brand.orange">
						myconfigstore
					</Text>{" "}
					internally for many usecases including the ones mentioned above, one of which is for promo codes. We have a dedicated store for this and
					multiple private and one public product.
				</Text>
			</SectionContent>
			<SectionContent>
				<Text fontWeight="bold" textAlign="center" maxW="3xl" mx="auto" lineHeight="125%" fontSize={{ base: "xl", md: "3xl" }} color="brand.light">
					You can check for publically available promo codes through the following endpoint -
				</Text>
			</SectionContent>
			<SectionContent>
				<Link
					wordBreak="break-all"
					fontWeight="bold"
					textAlign="center"
					fontSize={{ base: "lg", md: "2xl" }}
					href="https://promo.myconfig.store/api/v1/public_codes"
					isExternal
				>
					https://promo.myconfig.store/api/v1/public_codes
				</Link>
			</SectionContent>
		</Section>
	)
}
