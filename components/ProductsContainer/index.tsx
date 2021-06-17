import { Button, Center, CircularProgress, Grid, HStack, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { FaBoxOpen } from "react-icons/fa"
import { useGetAllProductsQuery } from "../../lib/hooks/product"
import { Card } from "../Card"
import { CreateProductModal } from "../CreateProductModal"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { ProductContainer } from "../ProductContainer"
import { StoreContainer } from "../StoreContainer"

interface ProductsContainerProps {
	storeId: string
}

export const ProductsContainer: React.FC<ProductsContainerProps> = ({ storeId }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	const { isLoading, data: products, isError, error } = useGetAllProductsQuery({ storeId })

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<HStack spacing="6">
				<HeadingWithIcon icon={FaBoxOpen} fontSize="xl">
					Products
				</HeadingWithIcon>
				<Button  fontSize={{ base: "md", md: "lg" }} {...getButtonProps()}>
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
			) : products && products.length > 0 ? (
				<Grid gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="4" w="full" maxW="5xl">
					{products.map((product) => (
						<ProductContainer product={product} />
					))}
				</Grid>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You have not created any products yet.
				</Card>
			)}
			<CreateProductModal storeId={storeId} isOpen={isOpen} onClose={onClose} />
		</VStack>
	)
}
