import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { GET_ALL_PRODUCTS } from "./getAllProductsQuery"
import { GET_PRODUCT } from "./useGetProductQuery"

export const DEACTIVATE_PRODUCT = "deactivateProduct"

export const useDeactivateProductMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([DEACTIVATE_PRODUCT, storeId, productId], async () => {
		return axios
			.put<{ message: string }>(`/api/store/${storeId}/product/${productId}/deactivate`)
			.then(async (res) => {
				await queryClient.refetchQueries([GET_ALL_PRODUCTS, storeId])
				await queryClient.invalidateQueries([GET_PRODUCT, storeId, productId])

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
