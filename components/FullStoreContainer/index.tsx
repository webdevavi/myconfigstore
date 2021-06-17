import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, CircularProgress, Heading, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { useGetStoreQuery } from "../../lib/hooks/store"
import { Card } from "../Card"
import { ProductsContainer } from "../ProductsContainer"
import { StoreSettings } from "../StoreSettings"

interface FullStoreContainerProps {
	storeId: string
}

export const FullStoreContainer: React.FC<FullStoreContainerProps> = ({ storeId }) => {
	const { isLoading, data: store, isError, error } = useGetStoreQuery({ storeId })

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<VStack w="full" alignItems="flex-start" spacing="2">
				<HStack spacing="6">
					<Heading fontSize="2xl" color="brand.orange">
						{storeId}
					</Heading>
				</HStack>
				<Breadcrumb fontWeight="black">
					<BreadcrumbItem>
						<BreadcrumbLink href="/user/stores">stores</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink href={`/user/stores/${storeId}`}>{storeId}</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</VStack>
			{isLoading ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					<CircularProgress isIndeterminate />
				</Card>
			) : isError && error ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.error">
					{(error as any)?.message}
				</Card>
			) : store ? (
				<VStack w="full" alignItems="flex-start" spacing="8">
					<StoreSettings store={store} />
					<ProductsContainer storeId={storeId} />
				</VStack>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					We could not find the store.
				</Card>
			)}
		</VStack>
	)
}
