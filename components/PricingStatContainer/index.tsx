import { Center, Grid, Heading, useBreakpointValue, VStack } from "@chakra-ui/react"
import numeral from "numeral"
import React, { useState } from "react"
import { useInView } from "react-intersection-observer"
import pricingPlans from "../../pricing.json"
import { StatContainer } from "./StatContainer"

interface PricingStatContainerProps {
	pricing:
		| typeof pricingPlans.trial
		| typeof pricingPlans.hobby
		| typeof pricingPlans.developer
		| typeof pricingPlans["developer-annual"]
		| typeof pricingPlans.enterprise
}

export const PricingStatContainer: React.FC<PricingStatContainerProps> = ({ pricing }) => {
	const [isActive, setIsActive] = useState(false)

	const { ref, inView } = useInView({
		threshold: 1,
	})

	const isExpanded = useBreakpointValue({ base: inView, md: isActive })

	return (
		<VStack
			ref={ref}
			bg="brand.orangeDarker"
			minW="xs"
			mx={{ md: 8 }}
			my={8}
			CenterShadow={isExpanded ? "2xl" : "md"}
			onMouseEnter={() => setIsActive(true)}
			onMouseLeave={() => setIsActive(false)}
			onFocus={() => setIsActive(true)}
			onBlur={() => setIsActive(false)}
			bgImage=" linear-gradient(to right, transparent, transparent), linear-gradient(to right, #A35709, #FF8303)"
			bgSize={isExpanded ? "0 0.8em, 100% 0.8em" : "100% 0.8em, 0 0.8em"}
			bgPos="100% 100%, 100% 0"
			bgRepeat="no-repeat"
			transform={`scale(${isExpanded ? 1.08 : 1})`}
			transition="all 0.2s ease-in-out"
		>
			<VStack p={{ base: 4, md: 8 }} spacing="8" pt={{ base: 6, md: 10 }}>
				<Heading color="brand.orange" opacity={isExpanded ? 1 : 0.6} transition="all 0.2s ease-in-out">
					{pricing.label}
				</Heading>
				<Grid templateColumns={{ base: "repeat(2, 1fr)", md: "1fr" }} gap="8">
					{Object.keys(pricing.features)
						.filter((feature) => feature !== "rateLimit")
						.map((feature) => {
							let stat: string | number | boolean | null = pricing.features[feature as keyof typeof pricing.features]

							if (typeof stat === "boolean") {
								if (stat) {
									stat = "Yes"
								} else {
									stat = "No"
								}
							}

							return (
								<StatContainer key={feature} label={feature}>
									{stat ?? "UNLIMITED"}
								</StatContainer>
							)
						})}
				</Grid>
			</VStack>
			<Center w="full" bg={isExpanded ? "brand.orange" : "brand.orangeDark"} py="2" transition="background-color 0.2s ease-in-out">
				<Heading color="brand.dark">{pricing.bill ? numeral(pricing.bill).format("$0.00a") : pricing.bill === 0 ? "Free" : "Contact us"}</Heading>
			</Center>
		</VStack>
	)
}
