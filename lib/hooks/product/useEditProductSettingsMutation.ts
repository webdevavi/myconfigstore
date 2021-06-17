import axios from "axios"
import { useMutation } from "react-query"
import { EditProductSettingsFormValues } from "../../../components"

const EDIT_PRODUCT_SETTINGS = "editProductSettings"

export const useEditProductSettingsMutation = ({ storeId, productId }: { storeId: string; productId: string }) => {
	return useMutation([EDIT_PRODUCT_SETTINGS, storeId, productId], async (settings: EditProductSettingsFormValues) => {
		return await axios.post<{ message: string }>(`/api/store/${storeId}/product/${productId}/settings/edit`, settings).catch((err) => {
			if (err.response.data) {
				throw err.response.data
			}

			throw err
		})
	})
}
