import { useContext } from "react"
import { CurrentUserContext } from "../../context/currentUser"
import { AppUser } from "../../models"
import * as currentUserActions from "../../context/currentUser/actions"

export const useCurrentUser = () => {
	const [currentUserState, dispatch] = useContext(CurrentUserContext)

	const setUser = (user: AppUser) => dispatch(currentUserActions.setCurrentUser(user))

	const setIsLoading = () => dispatch(currentUserActions.setIsLoading())

	const setIsError = (error: unknown) => dispatch(currentUserActions.setIsError(error))

	const removeUser = () => dispatch(currentUserActions.removeCurrentUser())

	return { ...currentUserState, setUser, setIsLoading, setIsError, removeUser }
}
