import { Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Store } from "../../../lib/models"
import { DeactivateStoreModal } from "../../DeactivateStoreModal"

interface DeactivateStoreButtonProps {
	store: Store
}

export const DeactivateStoreButton: React.FC<DeactivateStoreButtonProps> = ({ store }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<Button variant="outline" w={{ base: "full", md: "auto" }} fontSize="md" {...getButtonProps()}>
				Deactivate
			</Button>
			<DeactivateStoreModal storeId={store.storeId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
