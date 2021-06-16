import axios from "axios"
import { useMutation } from "react-query"
import { IStore } from "../../models"

const CREATE_STORE = "createStore"

export const useCreateStoreMutation = () => {
	return useMutation(CREATE_STORE, async (store: { storeId: IStore["storeId"] }) => {
		return await axios.post<{ message: string }>("/api/store/create", store)
	})
}
