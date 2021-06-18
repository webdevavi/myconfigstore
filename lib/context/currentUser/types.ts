import { AppUser } from "../../models"

export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const SET_IS_LOADING = "SET_IS_LOADING"
export const SET_IS_ERROR = "SET_IS_ERROR"
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER"

export type CurrentUserState = { currentUser?: AppUser; isLoading: boolean; isError: boolean; error?: unknown }

export type CurrentUserAction = {
	type: typeof SET_CURRENT_USER | typeof SET_IS_LOADING | typeof SET_IS_ERROR | typeof REMOVE_CURRENT_USER
	payload?: Partial<CurrentUserState>
}
