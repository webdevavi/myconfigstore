import { Heading, HStack, Icon, LinkBox, LinkOverlay, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import { FaBoxOpen, FaCalendar } from "react-icons/fa"
import { Store } from "../../lib/models"
import { Card } from "../Card"
import { StatusTag } from "../StatusTag"

interface StoreContainerProps {
	store: Store
}

export const StoreContainer: React.FC<StoreContainerProps> = ({ store }) => {
	return (
		<LinkBox w="full" maxW={{ base: "full", sm: "2xs" }} mx={{ base: 0, sm: 2 }} my="2">
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
					<Icon as={FaBoxOpen} fontSize="4xl" color="brand.orange" />
					<Heading as="span" fontSize="xl" color="brand.orange">
						{store.products} Products
					</Heading>
				</HStack>
				<HStack>
					<Icon as={FaCalendar} fontSize="md" color="brand.orange" opacity="0.8" />
					<Text fontSize="xs" color="brand.orange" opacity="0.8">
						created {store.createdAt}
					</Text>
				</HStack>
				<HStack>
					<Icon as={FaCalendar} fontSize="md" color="brand.orange" opacity="0.8" />
					<Text fontSize="xs" color="brand.orange" opacity="0.8">
						updated {store.updatedAt}
					</Text>
				</HStack>
			</Card>
		</LinkBox>
	)
}
