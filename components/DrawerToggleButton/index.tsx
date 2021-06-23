import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react"
import { useDrawer } from "@hooks/drawer"
import { loadDynamicComponent } from "@lib/utils"
import React from "react"
import { IconType } from "react-icons/lib"

const FaBars = loadDynamicComponent<IconType>(() => import("react-icons/fa").then((mod) => mod.FaBars))
const FaTimes = loadDynamicComponent<IconType>(() => import("react-icons/fa").then((mod) => mod.FaTimes))

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
