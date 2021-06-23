import { Text, Link } from "@chakra-ui/react"
import { Section, SectionHeader } from "@components"
import React from "react"

export const InternalUseSection = () => {
	return (
		<Section>
			<SectionHeader>
				<span className="section__header">w</span>e use{" "}
				<Text as="span" color="brand.orangeDark">
					my
				</Text>
				config internally
			</SectionHeader>
			<Text fontWeight="bold" textAlign="center" maxW="3xl" mx="auto" lineHeight="125%" fontSize={{ base: "xl", md: "3xl" }} color="brand.light">
				we are using{" "}
				<Text as="span" color="brand.orange">
					myconfigstore
				</Text>{" "}
				internally for many usecases including the ones mentioned above, one of which is for promo codes. We have a dedicated store for this and
				multiple private and one public product.
			</Text>
			<Text fontWeight="bold" textAlign="center" maxW="3xl" mx="auto" lineHeight="125%" fontSize={{ base: "xl", md: "3xl" }} color="brand.light">
				You can check for publically available promo codes through the following endpoint -
			</Text>
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
		</Section>
	)
}
