import { CurrentUserAction, CurrentUserState, REMOVE_CURRENT_USER, SET_CURRENT_USER, SET_IS_ERROR, SET_IS_LOADING } from "./types"

export const initialCurrentUserState: CurrentUserState = {
	isLoading: false,
	isError: false,
}

export const currentUserReducer = (state: CurrentUserState = initialCurrentUserState, action: CurrentUserAction): CurrentUserState => {
	switch (action.type) {
		case SET_CURRENT_USER: {
			const { currentUser } = action.payload as Required<CurrentUserState>

			return { ...state, currentUser, isLoading: false, isError: false, error: undefined }
		}

		case SET_IS_LOADING: {
			return { ...state, isLoading: true, isError: false, error: undefined }
		}

		case SET_IS_ERROR: {
			const { error } = action.payload as { error: Required<Pick<CurrentUserState, "error">> }

			return { ...state, isLoading: false, isError: true, error }
		}

		case REMOVE_CURRENT_USER: {
			return { ...state, currentUser: undefined }
		}

		default: {
			return state
		}
	}
}
