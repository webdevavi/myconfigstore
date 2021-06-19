import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { IField } from "../../models"
import { GET_PRODUCT } from "./useGetProductQuery"

const EDIT_FIELD = "editField"

export const useEditFieldMutation = ({ storeId, productId, key }: { storeId: string; productId: string; key: string }) => {
	const queryClient = useQueryClient()

	return useMutation([EDIT_FIELD, storeId, productId, key], async (field: IField) => {
		return axios
			.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/field/edit/${key}`, field)
			.then(async (res) => {
				await queryClient.refetchQueries([GET_PRODUCT, storeId, productId])

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
