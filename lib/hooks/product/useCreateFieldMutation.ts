import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { IField } from "../../models"
import { GET_PRODUCT } from "./useGetProductQuery"

const CREATE_FIELD = "createField"

export const useCreateFieldMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([CREATE_FIELD, storeId, productId], async (field: IField) => {
		return await axios
			.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/field/create`, field)
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
