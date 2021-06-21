import React, { createContext, Dispatch, useReducer } from "react"
import { drawerReducer, initialDrawerState } from "./reducer"
import { DrawerAction, DrawerState } from "./types"

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export const DrawerContext = createContext<[DrawerState, Dispatch<DrawerAction>]>([initialDrawerState, () => {}])

export const DrawerContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(drawerReducer, initialDrawerState)

	return <DrawerContext.Provider value={[state, dispatch]}>{children}</DrawerContext.Provider>
}
