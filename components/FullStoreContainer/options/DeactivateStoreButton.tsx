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
			<Button variant="outline" fontSize={{ base: "sm", md: "md" }} {...getButtonProps()}>
				Deactivate
			</Button>
			<DeactivateStoreModal storeId={store.storeId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
