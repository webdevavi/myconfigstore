import { Heading, Text, VStack } from "@chakra-ui/react"
import numeral from "numeral"
import React from "react"

interface StatContainerProps {
	label: string
	children: number | string
}

export const StatContainer: React.FC<StatContainerProps> = ({ label, children }) => {
	let stat: string

	if (typeof children === "number") {
		stat = numeral(children).format("0a")
	} else {
		stat = children
	}

	return (
		<VStack>
			<Heading color="brand.orange" fontSize={{ base: "xl", md: "2xl" }} textTransform="uppercase">
				{stat}
			</Heading>
			<Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
				{label}
			</Text>
		</VStack>
	)
}
