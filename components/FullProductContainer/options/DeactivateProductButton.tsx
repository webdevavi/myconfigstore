import { Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Product } from "../../../lib/models"
import { DeactivateProductModal } from "../../DeactivateProductModal"

interface DeactivateProductButtonProps {
	product: Product
}

export const DeactivateProductButton: React.FC<DeactivateProductButtonProps> = ({ product }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<Button variant="outline" fontSize={{ base: "sm", md: "md" }} {...getButtonProps()}>
				Deactivate
			</Button>
			<DeactivateProductModal storeId={product.storeId} productId={product.productId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
