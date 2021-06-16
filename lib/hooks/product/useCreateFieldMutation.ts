import axios from "axios"
import { useMutation } from "react-query"
import { IField } from "../../models"

const CREATE_FIELD = "createField"

export const useCreateFieldMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	return useMutation([CREATE_FIELD, storeId, productId], async (field: IField) => {
		return await axios.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/field/create`, field)
	})
}
