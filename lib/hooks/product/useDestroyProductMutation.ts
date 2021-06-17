import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { GET_ALL_PRODUCTS } from "./getAllProductsQuery"
import { GET_PRODUCT } from "./useGetProductQuery"

export const DESTROY_PRODUCT = "destroyProduct"

export const useDestroyProductMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([DESTROY_PRODUCT, storeId, productId], async () => {
		return await axios.delete<{ message: string }>(`/api/store/${storeId}/product/${productId}`).then(async (res) => {
			await queryClient.refetchQueries([GET_ALL_PRODUCTS, storeId])
			await queryClient.invalidateQueries([GET_PRODUCT, storeId, productId])

			return res
		})
	})
}
