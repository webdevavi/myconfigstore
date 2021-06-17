import { Button, Center, CircularProgress, Grid, HStack, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { FaWindowRestore } from "react-icons/fa"
import { useGetStoresQuery } from "../../lib/hooks/store"
import { Card } from "../Card"
import { CreateStoreModal } from "../CreateStoreModal"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { StoreContainer } from "../StoreContainer"

export const StoresContainer: React.FC = () => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	const { isLoading, data: stores, isError, error } = useGetStoresQuery()

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<HStack spacing="6">
				<HeadingWithIcon icon={FaWindowRestore}>Stores</HeadingWithIcon>
				<Button fontSize={{ base: "md", md: "lg" }} {...getButtonProps()}>
					New
				</Button>
			</HStack>
			{isLoading ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					<CircularProgress isIndeterminate />
				</Card>
			) : isError && error ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.error">
					{(error as any)?.message}
				</Card>
			) : stores && stores.length > 0 ? (
				<Grid gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="4" w="full" maxW="4xl">
					{stores.map((store) => (
						<StoreContainer store={store} />
					))}
				</Grid>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You have not created any stores yet.
				</Card>
			)}
			<CreateStoreModal isOpen={isOpen} onClose={onClose} />
		</VStack>
	)
}
