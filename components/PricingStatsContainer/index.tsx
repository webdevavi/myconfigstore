import { Flex } from "@chakra-ui/react"
import React from "react"
import pricingPlans from "../../pricing.json"
import { PricingStatContainer } from "../PricingStatContainer"

const pricings = Object.values(pricingPlans)

export const PricingStatsContainer: React.FC = () => {
	return (
		<Flex flexWrap="wrap" justifyContent="center">
			{pricings.map((pricing) => (
				<PricingStatContainer key={pricing.label} pricing={pricing} />
			))}
		</Flex>
	)
}
