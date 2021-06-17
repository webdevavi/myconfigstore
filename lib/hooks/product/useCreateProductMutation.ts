import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { IProduct } from "../../models"
import { GET_STORE } from "../store"
import { GET_ALL_PRODUCTS } from "./getAllProductsQuery"

const CREATE_PRODUCT = "createProduct"

export const useCreateProductMutation = ({ storeId }: { storeId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([CREATE_PRODUCT, storeId], async (product: { productId: IProduct["productId"] }) => {
		return await axios
			.post<{ message: string }>(`/api/store/${storeId}/product/create`, product)
			.then(async (res) => {
				await queryClient.refetchQueries([GET_STORE, storeId])
				await queryClient.refetchQueries([GET_ALL_PRODUCTS, storeId])

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
