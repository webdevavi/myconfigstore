import { IconButton, Icon, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { FaTrash } from "react-icons/fa"
import { Field } from "../../../lib/models"
import { RemoveFieldModal } from "../../RemoveFieldModal"

interface RemoveFieldButtonProps {
	fieldKey: string
	storeId: string
	productId: string
}

export const RemoveFieldButton: React.FC<RemoveFieldButtonProps> = ({ fieldKey, storeId, productId }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<IconButton aria-label="remove field" size="md" {...getButtonProps()}>
				<Icon as={FaTrash} />
			</IconButton>
			<RemoveFieldModal storeId={storeId} productId={productId} fieldKey={fieldKey} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
