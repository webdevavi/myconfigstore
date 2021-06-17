import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	ButtonGroup,
	Center,
	Checkbox,
	CircularProgress,
	Heading,
	HStack,
	Icon,
	IconButton,
	Input,
	Tooltip,
	useClipboard,
	useDisclosure,
	VStack,
} from "@chakra-ui/react"
import React from "react"
import { FaCog, FaCopy, FaGlobe, FaLock, FaRedo } from "react-icons/fa"
import { useGetProductQuery } from "../../lib/hooks/product"
import { Card } from "../Card"
import { CreateStoreModal } from "../CreateStoreModal"
import { FieldsContainer } from "../FieldsContainer"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { ProductsContainer } from "../ProductsContainer"
import { ProductSettings } from "../ProductSettings"
import { StatusTag } from "../StatusTag"
import { DeactivateProductButton } from "./options/DeactivateProductButton"
import { DestroyProductButton } from "./options/DestroyProductButton"
import { ReactivateProductButton } from "./options/ReactivateProductButton"

interface FullProductContainerProps {
	storeId: string
	productId: string
}

export const FullProductContainer: React.FC<FullProductContainerProps> = ({ storeId, productId }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	const { isLoading, data: product, isError, error } = useGetProductQuery({ storeId, productId })

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<VStack w="full" alignItems="flex-start" spacing="2">
				<HStack w="full" justifyContent="space-between">
					<HStack>
						<Heading fontSize="2xl" color="brand.orange">
							{productId}
						</Heading>
						{product?.isPrivate ? <Icon as={FaLock} color="brand.orange" /> : <Icon as={FaGlobe} color="brand.orange" />}
						<StatusTag isActive={product?.isActive} />
					</HStack>
					{product && (
						<ButtonGroup>
							{product.isActive ? <DeactivateProductButton product={product} /> : <ReactivateProductButton product={product} />}
							<DestroyProductButton product={product} />
						</ButtonGroup>
					)}
				</HStack>
				<Breadcrumb fontWeight="black">
					<BreadcrumbItem>
						<BreadcrumbLink href="/user/stores">stores</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink href={`/user/stores/${storeId}`}>{storeId}</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink href={`/user/stores/${storeId}/${productId}`}>{productId}</BreadcrumbLink>
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
			) : product ? (
				<VStack w="full" alignItems="flex-start" spacing="8">
					<ProductSettings product={product} />
					<FieldsContainer storeId={storeId} productId={productId} fields={product.fields} />
				</VStack>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					We could not find the store.
				</Card>
			)}
			<CreateStoreModal isOpen={isOpen} onClose={onClose} />
		</VStack>
	)
}
