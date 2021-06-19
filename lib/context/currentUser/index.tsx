import React, { createContext, useReducer } from "react"
import { currentUserReducer, initialCurrentUserState } from "./reducer"
import { CurrentUserAction, CurrentUserState } from "./types"

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export const CurrentUserContext = createContext<[CurrentUserState, React.Dispatch<CurrentUserAction>]>([initialCurrentUserState, () => {}])

export const CurrentUserContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(currentUserReducer, initialCurrentUserState)

	return <CurrentUserContext.Provider value={[state, dispatch]}>{children}</CurrentUserContext.Provider>
}
