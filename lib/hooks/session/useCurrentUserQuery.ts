import axios from "axios"
import { useQuery } from "react-query"
import { AppUser, AppUserJSON } from "../../models"
import { useCurrentUser } from "./useCurrentUser"

export const CURRENT_USER = "currentUser"

export const useCurrentUserQuery = () => {
	const { setUser, setIsLoading, setIsError } = useCurrentUser()

	return useQuery(
		CURRENT_USER,
		async () => {
			try {
				setIsLoading()
				const { data } = await axios.get<AppUserJSON>("/api/auth/currentUser")
				return AppUser.fromJSON(data)
			} catch (err) {
				if (err.response.data) {
					throw err.response.data
				}

				throw err
			}
		},
		{
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			retry: false,
			retryOnMount: false,
			onSuccess: setUser,
			onError: setIsError,
		}
	)
}
