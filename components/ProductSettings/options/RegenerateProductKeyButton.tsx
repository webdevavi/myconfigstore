import { Icon, IconButton, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { FaRedo } from "react-icons/fa"
import { Product } from "../../../lib/models"
import { RegenerateProductKeyModal } from "../../RegenerateProductKeyModal"

interface RegenerateProductKeyButtonProps {
	product: Product
}

export const RegenerateProductKeyButton: React.FC<RegenerateProductKeyButtonProps> = ({ product }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<IconButton aria-label="regenrate product key" size="xs" {...getButtonProps()}>
				<Icon as={FaRedo} />
			</IconButton>
			<RegenerateProductKeyModal storeId={product.storeId} productId={product.productId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
