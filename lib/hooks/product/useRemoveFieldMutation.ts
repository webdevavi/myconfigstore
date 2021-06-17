import axios from "axios"
import { useMutation } from "react-query"

const REMOVE_FIELD = "removeField"

export const useRemoveFieldMutation = ({ storeId, productId, key }: { storeId: string; productId: string; key: string }) => {
	return useMutation([REMOVE_FIELD, storeId, productId, key], async () => {
		return await axios.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/field/remove/${key}`).catch((err) => {
			if (err.response.data) {
				throw err.response.data
			}

			throw err
		})
	})
}
