import { Heading } from "@chakra-ui/react"
import React from "react"

export const SectionHeader: React.FC = ({ children }) => (
	<Heading textAlign="center" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} color="brand.orange">
		{children}
	</Heading>
)
