import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { GET_PRODUCT } from "./useGetProductQuery"

const REMOVE_FIELD = "removeField"

export const useRemoveFieldMutation = ({ storeId, productId, key }: { storeId: string; productId: string; key: string }) => {
	const queryClient = useQueryClient()

	return useMutation([REMOVE_FIELD, storeId, productId, key], async () => {
		return await axios
			.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/field/remove/${key}`)
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
