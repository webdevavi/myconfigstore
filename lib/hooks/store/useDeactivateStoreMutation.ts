import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { GET_STORES } from "./useGetStoresQuery"
import { GET_STORE } from "./useGetStoreQuery"

export const DEACTIVATE_STORE = "deactivateStore"

export const useDeactivateStoreMutation = ({ storeId }: { storeId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([DEACTIVATE_STORE, storeId], async () => {
		return await axios
			.put<{ message: string }>(`/api/store/${storeId}/deactivate`)
			.then(async (res) => {
				await queryClient.refetchQueries(GET_STORES)
				await queryClient.invalidateQueries([GET_STORE, storeId])

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
