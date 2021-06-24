import { Box, Button, Center, CircularProgress, Flex, HStack, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { FaBoxOpen } from "react-icons/fa"
import Lazyload from "react-lazyload"
import { useGetAllProductsQuery } from "../../lib/hooks/product"
import { Card } from "../Card"
import { CreateProductModal } from "../CreateProductModal"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { ProductContainer } from "../ProductContainer"

interface ProductsContainerProps {
	storeId: string
}

export const ProductsContainer: React.FC<ProductsContainerProps> = ({ storeId }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	const { isLoading, data: products, isError, error } = useGetAllProductsQuery({ storeId })

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<HStack w="full" spacing="6" justifyContent={{ base: "space-between", md: "flex-start" }}>
				<HeadingWithIcon icon={FaBoxOpen} fontSize="xl">
					Products
				</HeadingWithIcon>
				<Button fontSize={{ base: "md", md: "lg" }} {...getButtonProps()}>
					New
				</Button>
			</HStack>
			{isLoading ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
				</Card>
			) : isError && error ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.error">
					{(error as any)?.message}
				</Card>
			) : products && products.length > 0 ? (
				<Flex w="full" direction={{ base: "column", sm: "row" }} flexWrap={{ sm: "wrap" }}>
					{products.map((product) => (
						<Box key={product.id} minH="200px" w="full" maxW={{ base: "full", sm: "2xs" }} mx={{ base: 0, sm: 2 }} my="2">
							<Lazyload once throttle={100} height={200}>
								<ProductContainer product={product} />
							</Lazyload>
						</Box>
					))}
				</Flex>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You have not created any products yet.
				</Card>
			)}
			<CreateProductModal storeId={storeId} isOpen={isOpen} onClose={onClose} />
		</VStack>
	)
}
