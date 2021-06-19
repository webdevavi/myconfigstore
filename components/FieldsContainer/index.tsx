import { Button, Center, HStack, Stack, useDisclosure, VStack } from "@chakra-ui/react"
import React from "react"
import { FaWpforms } from "react-icons/fa"
import { Card, HeadingWithIcon } from ".."
import { Field } from "../../lib/models"
import { CreateFieldModal } from "../CreateFieldModal"
import { FieldContainer } from "../FieldContainer"

interface FieldsContainerProps {
	storeId: string
	productId: string
	fields?: Field[]
}

export const FieldsContainer: React.FC<FieldsContainerProps> = ({ storeId, productId, fields }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<HStack w="full" spacing="6" justifyContent={{ base: "space-between", md: "flex-start" }}>
				<HeadingWithIcon icon={FaWpforms} fontSize="xl">
					Fields
				</HeadingWithIcon>
				<Button fontSize={{ base: "md", md: "lg" }} {...getButtonProps()}>
					New
				</Button>
			</HStack>
			{fields && fields.length > 0 ? (
				<Stack w="full">
					{fields.map((field) => (
						<FieldContainer field={field} storeId={storeId} productId={productId} />
					))}
				</Stack>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You have not added any fields yet.
				</Card>
			)}
			<CreateFieldModal storeId={storeId} productId={productId} isOpen={isOpen} onClose={onClose} />
		</VStack>
	)
}
