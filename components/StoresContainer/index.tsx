import { Button, Center, HStack, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { FaWindowRestore } from "react-icons/fa"
import { Card } from "../Card"
import { CreateStoreModal } from "../CreateStoreModal"
import { HeadingWithIcon } from "../HeadingWithIcon"

interface StoresContainerProps {
	stores: unknown[]
}

export const StoresContainer: React.FC<StoresContainerProps> = ({ stores }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<HStack spacing="6">
				<HeadingWithIcon icon={FaWindowRestore}>Stores</HeadingWithIcon>
				<Button fontSize={{ base: "md", md: "lg" }} {...getButtonProps()}>
					New
				</Button>
			</HStack>
			{stores.length > 0 ? (
				<></>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You have not created any stores yet.
				</Card>
			)}
			<CreateStoreModal isOpen={isOpen} onClose={onClose} />
		</VStack>
	)
}
