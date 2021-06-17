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
	Text,
	useBreakpoint,
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

	const { onCopy, hasCopied } = useClipboard(product?.url ?? "", {
		timeout: 4000,
	})

	const breakpoint = useBreakpoint() ?? ""

	return (
		<VStack w="full" alignItems="flex-start" spacing="8" maxW="4xl">
			<VStack w="full" alignItems="flex-start" spacing="2">
				<HStack w="full" justifyContent="space-between">
					<HStack>
						<Heading fontSize="2xl" color="brand.orange">
							{productId}
						</Heading>
						{product && (
							<>
								{product?.isPrivate ? <Icon as={FaLock} color="brand.orange" /> : <Icon as={FaGlobe} color="brand.orange" />}
								<StatusTag isActive={product?.isActive} />
							</>
						)}
					</HStack>
					{product && !/base|sm/.test(breakpoint) && (
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

				{product && (
					<HStack>
						<Text fontSize="sm" opacity="0.8" overflowWrap="anywhere">
							{product.url}
						</Text>
						<Tooltip hasArrow label="Copied" isOpen={hasCopied}>
							<IconButton aria-label="copy url" size="xs" onClick={onCopy}>
								<Icon as={FaCopy} fontSize="sm" />
							</IconButton>
						</Tooltip>
					</HStack>
				)}
			</VStack>

			{product && /base|sm/.test(breakpoint) && (
				<ButtonGroup w="full">
					{product.isActive ? <DeactivateProductButton product={product} /> : <ReactivateProductButton product={product} />}
					<DestroyProductButton product={product} />
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
