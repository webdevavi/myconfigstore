import { Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Product } from "../../../lib/models"
import { DestroyProductModal } from "../../DestroyProductModal"

interface DestroyProductButtonProps {
	product: Product
}

export const DestroyProductButton: React.FC<DestroyProductButtonProps> = ({ product }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<Button
				borderColor="brand.error"
				color="brand.error"
				_hover={{
					bg: "brand.error",
					color: "brand.light",
				}}
				_focus={{
					bg: "brand.error",
					color: "brand.light",
				}}
				variant="outline"
				fontSize={{ base: "sm", md: "md" }}
				{...getButtonProps()}
			>
				Destroy
			</Button>
			<DestroyProductModal storeId={product.storeId} productId={product.productId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
