import { IconButton, Icon, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { FaEdit } from "react-icons/fa"
import { Product } from "../../../lib/models"
import { EditProductSettingsModal } from "../../EditProductSettingsModal"

interface EditProductSettingsButtonProps {
	product: Product
}

export const EditProductSettingsButton: React.FC<EditProductSettingsButtonProps> = ({ product }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<IconButton aria-label="edit field" size="md" {...getButtonProps()}>
				<Icon as={FaEdit} />
			</IconButton>
			<EditProductSettingsModal product={product} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
