import { ButtonGroup, Checkbox, FormLabel, Heading, HStack, Icon, IconButton, Input, Stack, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { FaEdit } from "react-icons/fa"
import { Field } from "../../lib/models"
import { Card } from "../Card"
import { EditFieldModal } from "../EditFieldModal"
import { RemoveFieldButton } from "./options/RemoveFieldButton"

interface FieldContainerProps {
	field: Field
	storeId: string
	productId: string
}

export const FieldContainer: React.FC<FieldContainerProps> = ({ field, storeId, productId }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<Card pos="relative" maxW="4xl" as={Stack} alignItems="flex-start">
				<ButtonGroup pos="absolute" top="2" right="2">
					<IconButton aria-label="edit field" size="md" {...getButtonProps()}>
						<Icon as={FaEdit} />
					</IconButton>
					<RemoveFieldButton fieldKey={field.key} storeId={storeId} productId={productId} />
				</ButtonGroup>
				<Stack w="full" direction={{ base: "column", lg: "row" }} alignItems="flex-start">
					<VStack w="full" alignItems="flex-start">
						<FormLabel>Key</FormLabel>
						<Input value={field.key} isReadOnly />
					</VStack>
					<VStack w="full" alignItems="flex-start">
						<FormLabel>Value</FormLabel>
						<Input value={field.value} isReadOnly />
					</VStack>
				</Stack>
				<HStack>
					<Checkbox isChecked={field.isEncrypted} isReadOnly />
					<Heading fontSize="lg" color="brand.orange">
						Encrypted (Default)
					</Heading>
				</HStack>
			</Card>
			<EditFieldModal
				storeId={storeId}
				productId={productId}
				initialValues={{ ...field, value: field.isEncrypted ? "" : field.value }}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	)
}
