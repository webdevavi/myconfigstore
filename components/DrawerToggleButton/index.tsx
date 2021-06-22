import { IconButtonProps, IconButton, Icon } from "@chakra-ui/react"
import { useDrawer } from "@hooks/drawer"
import React from "react"
import { FaTimes, FaBars } from "react-icons/fa"

export const DrawerToggleButton: React.FC<Omit<IconButtonProps, "aria-label">> = ({ children, ...props }) => {
	const { isOpen, onOpen, onClose } = useDrawer()

	return (
		<IconButton
			colorScheme="orange"
			aria-label="open drawer button"
			variant="ghost"
			size="md"
			rounded="full"
			onClick={isOpen ? onClose : onOpen}
			{...props}
		>
			{!isOpen ? children ?? <Icon as={FaBars} fontSize="2xl" color="brand.orange" /> : <Icon as={FaTimes} fontSize="3xl" color="brand.orange" />}
		</IconButton>
	)
}
