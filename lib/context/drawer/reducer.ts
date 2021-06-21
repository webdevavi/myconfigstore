import { DrawerAction, DrawerState, SET_CLOSED, SET_OPEN } from "./types"

export const initialDrawerState: DrawerState = {
	isOpen: false,
}

export const drawerReducer = (state: DrawerState = initialDrawerState, action: DrawerAction): DrawerState => {
	switch (action.type) {
		case SET_OPEN: {
			return { isOpen: true }
		}

		case SET_CLOSED: {
			return { isOpen: false }
		}

		default: {
			return state
		}
	}
}
