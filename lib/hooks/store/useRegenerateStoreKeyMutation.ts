import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { GET_STORE } from "./useGetStoreQuery"

const REGENERATE_STORE_KEY = "regenerateStoreKey"

export const useRegenerateStoreKeyMutation = ({ storeId }: { storeId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([REGENERATE_STORE_KEY, storeId], async () => {
		return await axios
			.patch<{ message: string }>(`/api/store/${storeId}/regenerateStoreKey`)
			.then(async (res) => {
				await queryClient.refetchQueries([GET_STORE, storeId])

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
