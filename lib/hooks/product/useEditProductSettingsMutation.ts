import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { EditProductSettingsFormValues } from "../../../components"
import { GET_PRODUCT } from "./useGetProductQuery"

const EDIT_PRODUCT_SETTINGS = "editProductSettings"

export const useEditProductSettingsMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	const queryClient = useQueryClient()

	return useMutation([EDIT_PRODUCT_SETTINGS, storeId, productId], async (settings: EditProductSettingsFormValues) => {
		return await axios
			.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/settings/edit`, settings)
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
