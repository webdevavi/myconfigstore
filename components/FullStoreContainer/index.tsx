import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Center,
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
import { FaCog, FaCopy, FaRedo } from "react-icons/fa"
import { useGetStoreQuery } from "../../lib/hooks/store"
import { Card } from "../Card"
import { CreateStoreModal } from "../CreateStoreModal"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { ProductsContainer } from "../ProductsContainer"

interface FullStoreContainerProps {
	storeId: string
}

export const FullStoreContainer: React.FC<FullStoreContainerProps> = ({ storeId }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	const { isLoading, data: store, isError, error } = useGetStoreQuery({ storeId })

	const { onCopy, hasCopied } = useClipboard(store?.storeKey ?? "", {
		timeout: 4000,
	})

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
					<VStack w="full" alignItems="flex-start">
						<HeadingWithIcon icon={FaCog} fontSize="xl">
							Settings
						</HeadingWithIcon>
						<Card maxW="4xl" as={VStack} alignItems="flex-start">
							<HStack>
								<Heading fontSize="lg" color="brand.orange">
									Store Key
								</Heading>
								<IconButton aria-label="regenerate store key" size="xs">
									<Icon as={FaRedo} />
								</IconButton>
							</HStack>
							<Box pos="relative" w="full">
								<Input pr="10" value={store.storeKey} isReadOnly />
								<Tooltip hasArrow label="Copied" isOpen={hasCopied}>
									<IconButton pos="absolute" top="50%" transform="translateY(-50%)" right="2" aria-label="copy store key" size="xs" onClick={onCopy}>
										<Icon as={FaCopy} />
									</IconButton>
								</Tooltip>
							</Box>
						</Card>
					</VStack>
					<ProductsContainer storeId={storeId} />
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
