export const SET_OPEN = "SET_OPEN"
export const SET_CLOSED = "SET_CLOSED"

export type DrawerState = { isOpen: boolean }

export type DrawerAction = {
	type: typeof SET_OPEN | typeof SET_CLOSED
	payload?: DrawerState
}
