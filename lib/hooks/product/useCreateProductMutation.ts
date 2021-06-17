import axios from "axios"
import { useMutation } from "react-query"
import { IProduct, IStore } from "../../models"

const CREATE_PRODUCT = "createProduct"

export const useCreateProductMutation = ({ storeId }: { storeId: string }) => {
	return useMutation([CREATE_PRODUCT, storeId], async (product: { productId: IProduct["productId"] }) => {
		return await axios.post<{ message: string }>(`/api/store/${storeId}/product/create`, product).catch((err) => {
			if (err.response.data) {
				throw err.response.data
			}

			throw err
		})
	})
}
