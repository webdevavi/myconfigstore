import { DrawerAction, SET_CLOSED, SET_OPEN } from "./types"

export const openDrawer = (): DrawerAction => ({
	type: SET_OPEN,
})

export const closeDrawer = (): DrawerAction => ({
	type: SET_CLOSED,
})
