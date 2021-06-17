import { Heading, HStack, Icon, IconButton, LinkBox, LinkOverlay, Tag, TagLabel, Text, Tooltip, useClipboard, VStack } from "@chakra-ui/react"
import React from "react"
import { FaCalendar, FaCopy, FaGlobe, FaLock, FaWpforms } from "react-icons/fa"
import { Product } from "../../lib/models"
import { Card } from "../Card"
import NextLink from "next/link"
import { StatusTag } from "../StatusTag"

interface ProductContainerProps {
	product: Product
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
	const { onCopy, hasCopied } = useClipboard(product.url ?? "", {
		timeout: 4000,
	})

	return (
		<LinkBox w="full">
			<NextLink href={`/user/stores/${product.storeId}/${product.productId}`} passHref>
				<LinkOverlay />
			</NextLink>
			<Card w="full" as={VStack} alignItems="flex-start">
				<HStack>
					<Heading fontSize="2xl" color="brand.orange">
						{product.productId}
					</Heading>
					{product.isPrivate ? <Icon as={FaLock} color="brand.orange" /> : <Icon as={FaGlobe} color="brand.orange" />}
					<StatusTag isActive={product.isActive} />
				</HStack>
				<HStack>
					<Text fontSize="xs" opacity="0.8">
						{product.url}
					</Text>
					<Tooltip hasArrow label="Copied" isOpen={hasCopied}>
						<IconButton aria-label="copy url" size="xs" onClick={onCopy}>
							<Icon as={FaCopy} fontSize="sm" />
						</IconButton>
					</Tooltip>
				</HStack>
				<HStack>
					<Icon as={FaWpforms} fontSize="4xl" color="brand.orange" />
					<Heading as="span" fontSize="xl" color="brand.orange">
						{product.fields?.length ?? 0} Fields
					</Heading>
				</HStack>
				<HStack>
					<Icon as={FaCalendar} fontSize="md" color="brand.orange" opacity="0.8" />
					<Text fontSize="sm" color="brand.orange" opacity="0.8">
						created {product.createdAt}
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaCalendar} fontSize="md" color="brand.orange" opacity="0.8" />
					<Text fontSize="sm" color="brand.orange" opacity="0.8">
						updated {product.updatedAt}
					</Text>
				</HStack>
			</Card>
		</LinkBox>
	)
}
