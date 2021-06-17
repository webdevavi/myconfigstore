import axios from "axios"
import { useMutation } from "react-query"

const REGENERATE_STORE_KEY = "regenerateStoreKey"

export const useRegenerateStoreKeyMutation = ({ storeId }: { storeId: string }) => {
	return useMutation([REGENERATE_STORE_KEY, storeId], async () => {
		return await axios.patch<{ message: string }>(`/api/store/${storeId}/regenerateStoreKey`)
	})
}
