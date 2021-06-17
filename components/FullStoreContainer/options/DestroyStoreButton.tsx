import { Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Store } from "../../../lib/models"
import { DestroyStoreModal } from "../../DestroyStoreModal"

interface DestroyStoreButtonProps {
	store: Store
}

export const DestroyStoreButton: React.FC<DestroyStoreButtonProps> = ({ store }) => {
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
			<DestroyStoreModal storeId={store.storeId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
