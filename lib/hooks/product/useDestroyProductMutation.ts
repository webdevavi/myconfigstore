import axios from "axios"
import { useMutation } from "react-query"

const DESTROY_PRODUCT = "destroyProduct"

export const useDestroyProductMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	return useMutation([DESTROY_PRODUCT, storeId, productId], async () => {
		return await axios.delete<{ message: string }>(`/api/store/${storeId}/product/${productId}`)
	})
}
