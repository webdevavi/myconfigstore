import axios from "axios"
import { useQuery } from "react-query"
import { AppUser, IAppUser } from "../../models"
import { useCurrentUser } from "./useCurrentUser"

export const CURRENT_USER = "currentUser"

export const useCurrentUserQuery = () => {
	const { setUser, setIsLoading, setIsError } = useCurrentUser()

	return useQuery(
		CURRENT_USER,
		async () => {
			try {
				setIsLoading()
				const { data } = await axios.get<IAppUser>("/api/auth/currentUser")
				return new AppUser(data)
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
			onSuccess: setUser,
			onError: setIsError,
		}
	)
}
