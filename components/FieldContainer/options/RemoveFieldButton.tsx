import { Icon, IconButton, useDisclosure } from "@chakra-ui/react"
import { loadDynamicComponent } from "@lib/utils"
import React from "react"
import { FaTrash } from "react-icons/fa"
import { RemoveFieldModalProps } from "../../RemoveFieldModal"

const RemoveFieldModal = loadDynamicComponent<RemoveFieldModalProps>(() => import("../../RemoveFieldModal").then((mod) => mod.RemoveFieldModal))

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
