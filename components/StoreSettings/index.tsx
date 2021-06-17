import { Box, Heading, HStack, Icon, IconButton, Input, Tooltip, useClipboard, VStack } from "@chakra-ui/react"
import React from "react"
import { FaCog, FaCopy } from "react-icons/fa"
import { Card, HeadingWithIcon } from ".."
import { Store } from "../../lib/models"
import { RegenerateStoreKeyButton } from "./options/RegenerateStoreKeyButton"

interface StoreSettingsProps {
	store: Store
}

export const StoreSettings: React.FC<StoreSettingsProps> = ({ store }) => {
	const { onCopy, hasCopied } = useClipboard(store?.storeKey ?? "", {
		timeout: 4000,
	})

	return (
		<VStack w="full" alignItems="flex-start">
			<HeadingWithIcon icon={FaCog} fontSize="xl">
				Settings
			</HeadingWithIcon>
			<Card maxW="4xl" as={VStack} alignItems="flex-start">
				<HStack>
					<Heading fontSize="lg" color="brand.orange">
						Store Key
					</Heading>
					<RegenerateStoreKeyButton store={store} />
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
	)
}
