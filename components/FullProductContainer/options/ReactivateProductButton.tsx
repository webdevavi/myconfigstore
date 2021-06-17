import { Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Product } from "../../../lib/models"
import { ReactivateProductModal } from "../../ReactivateProductModal"

interface ReactivateProductButtonProps {
	product: Product
}

export const ReactivateProductButton: React.FC<ReactivateProductButtonProps> = ({ product }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<Button
				borderColor="brand.success"
				color="brand.success"
				_hover={{
					bg: "brand.success",
					color: "brand.light",
				}}
				_focus={{
					bg: "brand.success",
					color: "brand.light",
				}}
				variant="outline"
				fontSize={{ base: "sm", md: "md" }}
				{...getButtonProps()}
			>
				Reactivate
			</Button>
			<ReactivateProductModal storeId={product.storeId} productId={product.productId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
