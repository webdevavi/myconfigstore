import {
	BoxProps,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	ButtonGroupProps,
	CenterProps,
	CircularProgress,
	ComponentWithAs,
	Heading,
	HStack,
	IconButtonProps,
	IconProps,
	StackProps,
	TextProps,
	TooltipProps,
	useBreakpoint,
	useClipboard,
} from "@chakra-ui/react"
import { useGetProductQuery } from "@hooks"
import { loadDynamicComponent } from "@lib/utils"
import React from "react"
import { IconType } from "react-icons/lib"
import { FieldsContainerProps } from "../FieldsContainer"
import { ProductSettingsProps } from "../ProductSettings"
import { StatusTagProps } from "../StatusTag"
import { DeactivateProductButtonProps } from "./options/DeactivateProductButton"
import { DestroyProductButtonProps } from "./options/DestroyProductButton"
import { ReactivateProductButtonProps } from "./options/ReactivateProductButton"

const Icon = loadDynamicComponent<IconProps>(() => import("@chakra-ui/react").then((mod) => mod.Icon)) as ComponentWithAs<"svg", IconProps>
const FaLock = loadDynamicComponent<IconType>(() => import("react-icons/fa").then((mod) => mod.FaLock))
const FaGlobe = loadDynamicComponent<IconType>(() => import("react-icons/fa").then((mod) => mod.FaGlobe))
const FaCopy = loadDynamicComponent<IconType>(() => import("react-icons/fa").then((mod) => mod.FaCopy))
const StatusTag = loadDynamicComponent<StatusTagProps>(() => import("../StatusTag").then((mod) => mod.StatusTag))
const ButtonGroup = loadDynamicComponent<ButtonGroupProps>(() => import("@chakra-ui/react").then((mod) => mod.ButtonGroup))
const Text = loadDynamicComponent<TextProps>(() => import("@chakra-ui/react").then((mod) => mod.Text))
const Tooltip = loadDynamicComponent<TooltipProps>(() => import("@chakra-ui/react").then((mod) => mod.Tooltip))
const IconButton = loadDynamicComponent<IconButtonProps>(() => import("@chakra-ui/react").then((mod) => mod.IconButton))
const Center = loadDynamicComponent<CenterProps>(() => import("@chakra-ui/react").then((mod) => mod.Center))
const VStack = loadDynamicComponent<StackProps>(() => import("@chakra-ui/react").then((mod) => mod.VStack))
const Card = loadDynamicComponent<BoxProps>(() => import("../Card").then((mod) => mod.Card))
const DeactivateProductButton = loadDynamicComponent<DeactivateProductButtonProps>(() =>
	import("./options/DeactivateProductButton").then((mod) => mod.DeactivateProductButton)
)
const DestroyProductButton = loadDynamicComponent<DestroyProductButtonProps>(() =>
	import("./options/DestroyProductButton").then((mod) => mod.DestroyProductButton)
)
const ReactivateProductButton = loadDynamicComponent<ReactivateProductButtonProps>(() =>
	import("./options/ReactivateProductButton").then((mod) => mod.ReactivateProductButton)
)
const ProductSettings = loadDynamicComponent<ProductSettingsProps>(() => import("../ProductSettings").then((mod) => mod.ProductSettings))

const FieldsContainer = loadDynamicComponent<FieldsContainerProps>(() => import("../FieldsContainer").then((mod) => mod.FieldsContainer))

interface FullProductContainerProps {
	storeId: string
	productId: string
}

export const FullProductContainer: React.FC<FullProductContainerProps> = ({ storeId, productId }) => {
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
		</VStack>
	)
}
