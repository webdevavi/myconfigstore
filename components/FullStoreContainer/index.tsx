import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	ButtonGroup,
	Center,
	CircularProgress,
	Heading,
	HStack,
	useBreakpoint,
	VStack,
} from "@chakra-ui/react"
import React from "react"
import { useGetStoreQuery } from "../../lib/hooks/store"
import { Card } from "../Card"
import { ProductsContainer } from "../ProductsContainer"
import { StatusTag } from "../StatusTag"
import { StoreSettings } from "../StoreSettings"
import { DeactivateStoreButton } from "./options/DeactivateStoreButton"
import { DestroyStoreButton } from "./options/DestroyStoreButton"
import { ReactivateStoreButton } from "./options/ReactivateStoreButton"

interface FullStoreContainerProps {
	storeId: string
}

export const FullStoreContainer: React.FC<FullStoreContainerProps> = ({ storeId }) => {
	const { isLoading, data: store, isError, error } = useGetStoreQuery({ storeId })

	const breakpoint = useBreakpoint() ?? ""

	return (
		<VStack w="full" alignItems="flex-start" spacing="8" maxW="4xl">
			<VStack w="full" alignItems="flex-start" spacing="2">
				<HStack w="full" justifyContent="space-between">
					<HStack spacing="6">
						<Heading fontSize="2xl" color="brand.orange">
							{storeId}
						</Heading>
						{store && <StatusTag isActive={store?.isActive} />}
					</HStack>
					{store && !/base|sm/.test(breakpoint) && (
						<ButtonGroup>
							{store.isActive ? <DeactivateStoreButton store={store} /> : <ReactivateStoreButton store={store} />}
							<DestroyStoreButton store={store} />
						</ButtonGroup>
					)}
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

			{store && /base|sm/.test(breakpoint) && (
				<ButtonGroup w="full">
					{store.isActive ? <DeactivateStoreButton store={store} /> : <ReactivateStoreButton store={store} />}
					<DestroyStoreButton store={store} />
				</ButtonGroup>
			)}

			{isLoading ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
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
