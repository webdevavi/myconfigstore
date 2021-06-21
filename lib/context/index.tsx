import React from "react"
import { CurrentUserContextProvider } from "./currentUser"
import { DrawerContextProvider } from "./drawer"

export const ContextProvider: React.FC = ({ children }) => {
	return (
		<CurrentUserContextProvider>
			<DrawerContextProvider>{children}</DrawerContextProvider>
		</CurrentUserContextProvider>
	)
}
