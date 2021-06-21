import { DrawerContext } from "@lib/context/drawer"
import { closeDrawer, openDrawer } from "@lib/context/drawer/actions"
import { useContext } from "react"

export const useDrawer = () => {
	const [state, dispatch] = useContext(DrawerContext)

	const onOpen = () => dispatch(openDrawer())

	const onClose = () => dispatch(closeDrawer())

	return { ...state, onOpen, onClose }
}
