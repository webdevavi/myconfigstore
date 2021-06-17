import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { GET_STORES } from "./useGetStoresQuery"
import { GET_STORE } from "./useGetStoreQuery"

export const DESTROY_STORE = "destroyStore"

export const useDestroyStoreMutation = ({ storeId }: { storeId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([DESTROY_STORE, storeId], async () => {
		return await axios.delete<{ message: string }>(`/api/store/${storeId}`).then(async (res) => {
			await queryClient.refetchQueries(GET_STORES)
			await queryClient.invalidateQueries([GET_STORE, storeId])

			return res
		})
	})
}
