import axios from "axios"
import { useQuery } from "react-query"
import { IProduct, Product } from "../../models"

export const GET_PRODUCT = "getProduct"

export const useGetProductQuery = ({ storeId, productId }: { storeId: string; productId: string }) => {
	return useQuery(
		[GET_PRODUCT, storeId, productId],
		() => {
			if (!storeId || !productId) return null

			return axios
				.get<IProduct>(`/api/store/${storeId}/product/${productId}`)
				.then(({ data: product }) => new Product(product))
				.catch((err) => {
					if (err.response.data) {
						throw err.response.data
					}

					throw err
				})
		},
		{
			refetchOnMount: false,
		}
	)
}
