import { Stack, Heading, Progress } from "@chakra-ui/react"
import React from "react"

export interface UsageContainerProps {
	label: string
	value: number
	valueToShow?: number | string
}

export const UsageContainer: React.FC<UsageContainerProps> = ({ label, value, valueToShow }) => (
	<Stack w="full" direction={{ base: "column", md: "row" }} alignItems="center">
		<Heading flex="3" fontSize="lg" color="brand.orange">
			{label}
		</Heading>
		<Heading flex="1" fontSize="md" color="brand.orange" opacity="0.8">
			{valueToShow ?? `${value}%`}
		</Heading>
		<Progress flex="6" w="full" value={value} />
	</Stack>
)
