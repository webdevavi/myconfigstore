import { Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Store } from "../../../lib/models"
import { ReactivateStoreModal } from "../../ReactivateStoreModal"

interface ReactivateStoreButtonProps {
	store: Store
}

export const ReactivateStoreButton: React.FC<ReactivateStoreButtonProps> = ({ store }) => {
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
				w={{ base: "full", md: "auto" }}
				fontSize="md"
				{...getButtonProps()}
			>
				Reactivate
			</Button>
			<ReactivateStoreModal storeId={store.storeId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
