import { Heading, HStack, Icon, IconButton, LinkBox, LinkOverlay, Tag, TagLabel, Text, Tooltip, useClipboard, VStack } from "@chakra-ui/react"
import React from "react"
import { FaBoxOpen, FaCalendar, FaCopy } from "react-icons/fa"
import { Store } from "../../lib/models"
import { Card } from "../Card"
import NextLink from "next/link"
import { StatusTag } from "../StatusTag"

interface StoreContainerProps {
	store: Store
}

export const StoreContainer: React.FC<StoreContainerProps> = ({ store }) => {
	const { onCopy, hasCopied } = useClipboard(store.url ?? "", {
		timeout: 4000,
	})

	return (
		<LinkBox w="full">
			<NextLink href={`/user/stores/${store.storeId}`} passHref>
				<LinkOverlay />
			</NextLink>
			<Card w="full" as={VStack} alignItems="flex-start">
				<HStack>
					<Heading fontSize="2xl" color="brand.orange">
						{store.storeId}
					</Heading>
					<StatusTag isActive={store.isActive} />
				</HStack>
				<HStack>
					<Text fontSize="sm" opacity="0.8">
						{store.url}
					</Text>
					<Tooltip hasArrow label="Copied" isOpen={hasCopied}>
						<IconButton aria-label="copy url" size="xs" onClick={onCopy}>
							<Icon as={FaCopy} fontSize="sm" />
						</IconButton>
					</Tooltip>
				</HStack>
				<HStack>
					<Icon as={FaBoxOpen} fontSize="4xl" color="brand.orange" />
					<Heading as="span" fontSize="xl" color="brand.orange">
						{store.products} Products
					</Heading>
				</HStack>
				<HStack>
					<Icon as={FaCalendar} fontSize="md" color="brand.orange" opacity="0.8" />
					<Text fontSize="sm" color="brand.orange" opacity="0.8">
						created {store.createdAt}
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaCalendar} fontSize="md" color="brand.orange" opacity="0.8" />
					<Text fontSize="sm" color="brand.orange" opacity="0.8">
						updated {store.updatedAt}
					</Text>
				</HStack>
			</Card>
		</LinkBox>
	)
}
