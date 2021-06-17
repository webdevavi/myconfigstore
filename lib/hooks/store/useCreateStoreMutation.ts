import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { IStore } from "../../models"
import { GET_STORES } from "./useGetStoresQuery"

const CREATE_STORE = "createStore"

export const useCreateStoreMutation = () => {
	const queryClient = useQueryClient()

	return useMutation(CREATE_STORE, async (store: { storeId: IStore["storeId"] }) => {
		return await axios
			.post<{ message: string }>("/api/store/create", store)
			.then(async (res) => {
				await queryClient.refetchQueries(GET_STORES)

				return res
			})
			.catch((err) => {
				if (err.response.data) {
					throw err.response.data
				}

				throw err
			})
	})
}
