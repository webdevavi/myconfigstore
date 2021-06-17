import axios from "axios"
import { useMutation } from "react-query"
import { IField } from "../../models"

const EDIT_FIELD = "editField"

export const useEditFieldMutation = ({ storeId, productId, key }: { storeId: string; productId: string; key: string }) => {
	return useMutation([EDIT_FIELD, storeId, productId, key], async (field: IField) => {
		return await axios.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/field/edit/${key}`, field).catch((err) => {
			if (err.response.data) {
				throw err.response.data
			}

			throw err
		})
	})
}
