import { VStack, HStack, Checkbox, Heading, IconButton, Icon, Box, Input, Tooltip, useClipboard } from "@chakra-ui/react"
import React from "react"
import { FaCog, FaRedo, FaCopy } from "react-icons/fa"
import { HeadingWithIcon, Card } from ".."
import { Product } from "../../lib/models"

interface ProductSettingsProps {
	product: Product
}

export const ProductSettings: React.FC<ProductSettingsProps> = ({ product }) => {
	const { onCopy, hasCopied } = useClipboard(product.productKey ?? "", {
		timeout: 4000,
	})

	return (
		<VStack w="full" alignItems="flex-start">
			<HeadingWithIcon icon={FaCog} fontSize="xl">
				Settings
			</HeadingWithIcon>
			<Card maxW="4xl">
				<VStack w="full" alignItems="flex-start" spacing="4">
					<HStack>
						<Checkbox isChecked={product.isPrivate} isReadOnly />
						<Heading fontSize="lg" color="brand.orange">
							Private (Default)
						</Heading>
					</HStack>
					<HStack>
						<Checkbox isChecked={product.isUsingStoreKey} isReadOnly />
						<Heading fontSize="lg" color="brand.orange">
							Use store key only (Default)
						</Heading>
					</HStack>

					{!product.isUsingStoreKey && product.productKey && (
						<VStack w="full" alignItems="flex-start" spacing="4">
							<HStack>
								<Heading fontSize="lg" color="brand.orange">
									Product Key
								</Heading>
								<IconButton aria-label="regenerate store key" size="xs">
									<Icon as={FaRedo} />
								</IconButton>
							</HStack>
							<Box pos="relative" w="full">
								<Input pr="10" value={product.productKey} isReadOnly />
								<Tooltip hasArrow label="Copied" isOpen={hasCopied}>
									<IconButton pos="absolute" top="50%" transform="translateY(-50%)" right="2" aria-label="copy store key" size="xs" onClick={onCopy}>
										<Icon as={FaCopy} />
									</IconButton>
								</Tooltip>
							</Box>
						</VStack>
					)}
				</VStack>
			</Card>
		</VStack>
	)
}
