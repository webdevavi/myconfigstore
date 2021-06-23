import { BoxProps, Button, Center, HStack, StackProps, useDisclosure, VStack } from "@chakra-ui/react"
import { loadDynamicComponent } from "@lib/utils"
import { Field } from "@models"
import React from "react"
import { FaWpforms } from "react-icons/fa"
import { CreateFieldModalProps } from "../CreateFieldModal"
import { FieldContainerProps } from "../FieldContainer"
import { HeadingWithIcon } from "../HeadingWithIcon"

const Card = loadDynamicComponent<BoxProps>(() => import("../Card").then((mod) => mod.Card))
const FieldContainer = loadDynamicComponent<FieldContainerProps>(() => import("../FieldContainer").then((mod) => mod.FieldContainer))
const Stack = loadDynamicComponent<StackProps>(() => import("@chakra-ui/react").then((mod) => mod.Stack))
const CreateFieldModal = loadDynamicComponent<CreateFieldModalProps>(() => import("../CreateFieldModal").then((mod) => mod.CreateFieldModal))

export interface FieldsContainerProps {
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
