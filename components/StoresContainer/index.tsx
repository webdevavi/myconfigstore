import { Button, Center, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { FaWindowRestore } from "react-icons/fa"
import { Card } from "../Card"
import { HeadingWithIcon } from "../HeadingWithIcon"

interface StoresContainerProps {
	stores: unknown[]
}

export const StoresContainer: React.FC<StoresContainerProps> = ({ stores }) => {
	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<HStack spacing="6">
				<HeadingWithIcon icon={FaWindowRestore}>Stores</HeadingWithIcon>
				<Button fontSize={{ base: "md", md: "lg" }}>New</Button>
			</HStack>
			{stores.length > 0 ? (
				<></>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You have not created any stores yet.
				</Card>
			)}
		</VStack>
	)
}
