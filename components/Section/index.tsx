import { VStack } from "@chakra-ui/react"
import React from "react"

export const Section: React.FC = ({ children }) => (
	<VStack w="full" py={{ base: 8, md: 16 }} px={{ base: 1, md: 4 }} spacing={{ base: 8, md: 16 }}>
		{children}
	</VStack>
)
