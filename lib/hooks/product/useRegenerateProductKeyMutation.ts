import axios from "axios"
import { useMutation } from "react-query"

const REGENERATE_PRODUCT_KEY = "regenerateProductKey"

export const useRegenerateProductKeyMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	return useMutation([REGENERATE_PRODUCT_KEY, storeId, productId], async () => {
		return await axios.patch<{ message: string }>(`/api/store/${storeId}/product/${productId}/regenerateProductKey`)
	})
}
