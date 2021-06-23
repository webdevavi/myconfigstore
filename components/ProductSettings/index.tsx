import { Box, ButtonGroup, Checkbox, Heading, HStack, Icon, IconButton, Input, Tooltip, useClipboard, VStack } from "@chakra-ui/react"
import React from "react"
import { FaCog, FaCopy } from "react-icons/fa"
import { Card, HeadingWithIcon } from ".."
import { Product } from "../../lib/models"
import { EditProductSettingsButton } from "./options/EditProductSettingsButton"
import { RegenerateProductKeyButton } from "./options/RegenerateProductKeyButton"

export interface ProductSettingsProps {
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
			<Card pos="relative" maxW="4xl">
				<ButtonGroup pos="absolute" top="2" right="2">
					<EditProductSettingsButton product={product} />
				</ButtonGroup>
				<VStack w="full" alignItems="flex-start" spacing="4">
					<HStack>
						<Checkbox isChecked={product.isPrivate} isReadOnly />
						<Heading fontSize="lg" color="brand.orange">
							Private (Default)
						</Heading>
					</HStack>
					{product.isPrivate && (
						<>
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
										<RegenerateProductKeyButton product={product} />
									</HStack>
									<Box pos="relative" w="full">
										<Input pr="10" value={product.productKey} isReadOnly />
										<Tooltip hasArrow label="Copied" isOpen={hasCopied}>
											<IconButton
												pos="absolute"
												top="50%"
												transform="translateY(-50%)"
												right="2"
												aria-label="copy store key"
												size="xs"
												onClick={onCopy}
											>
												<Icon as={FaCopy} />
											</IconButton>
										</Tooltip>
									</Box>
								</VStack>
							)}
						</>
					)}
				</VStack>
			</Card>
		</VStack>
	)
}
