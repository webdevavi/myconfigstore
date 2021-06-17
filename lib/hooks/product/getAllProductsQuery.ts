import axios from "axios"
import { useQuery } from "react-query"
import { IProduct, Product } from "../../models"

export const GET_ALL_PRODUCTS = "getAllProducts"

export const useGetAllProductsQuery = ({ storeId }: { storeId: string }) => {
	return useQuery(
		[GET_ALL_PRODUCTS, storeId],
		() => {
			if (!storeId) return null
			return axios.get<IProduct[]>(`/api/store/${storeId}/product/all`).then(({ data }) => data.map((product) => new Product(product)))
		},
		{
			refetchOnMount: false,
		}
	)
}
