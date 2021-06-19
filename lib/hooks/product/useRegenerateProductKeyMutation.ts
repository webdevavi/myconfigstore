import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { GET_PRODUCT } from "./useGetProductQuery"

const REGENERATE_PRODUCT_KEY = "regenerateProductKey"

export const useRegenerateProductKeyMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([REGENERATE_PRODUCT_KEY, storeId, productId], async () => {
		return axios
			.patch<{ message: string }>(`/api/store/${storeId}/product/${productId}/regenerateProductKey`)
			.then(async (res) => {
				await queryClient.refetchQueries([GET_PRODUCT, storeId, productId])

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
