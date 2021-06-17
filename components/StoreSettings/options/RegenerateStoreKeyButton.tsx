import { Icon, IconButton, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { FaRedo } from "react-icons/fa"
import { Store } from "../../../lib/models"
import { RegenerateStoreKeyModal } from "../../RegenerateStoreKeyModal"

interface RegenerateStoreKeyButtonProps {
	store: Store
}

export const RegenerateStoreKeyButton: React.FC<RegenerateStoreKeyButtonProps> = ({ store }) => {
	const { getButtonProps, isOpen, onClose } = useDisclosure()

	return (
		<>
			<IconButton aria-label="regenrate store key" size="xs" {...getButtonProps()}>
				<Icon as={FaRedo} />
			</IconButton>
			<RegenerateStoreKeyModal storeId={store.storeId} isOpen={isOpen} onClose={onClose} />
		</>
	)
}
