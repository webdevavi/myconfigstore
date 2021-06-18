import { AppUser } from "../../models"
import { CurrentUserAction, REMOVE_CURRENT_USER, SET_CURRENT_USER, SET_IS_LOADING } from "./types"

export const setCurrentUser = (currentUser: AppUser): CurrentUserAction => ({
	type: SET_CURRENT_USER,
	payload: { currentUser },
})

export const setIsLoading = (): CurrentUserAction => ({
	type: SET_IS_LOADING,
})

export const setIsError = (error: unknown): CurrentUserAction => ({
	type: SET_IS_LOADING,
	payload: { error },
})

export const removeCurrentUser = (): CurrentUserAction => ({
	type: REMOVE_CURRENT_USER,
})
