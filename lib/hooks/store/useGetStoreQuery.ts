import axios from "axios"
import { useQuery } from "react-query"
import { IStore, Store } from "../../models"

export const GET_STORE = "getStore"

export const useGetStoreQuery = ({ storeId }: { storeId: string }) => {
	return useQuery(
		[GET_STORE, storeId],
		() => {
			if (!storeId) return null

			return axios
				.get<IStore>(`/api/store/${storeId}`)
				.then(({ data: store }) => new Store(store))
				.catch((err) => {
					if (err.response.data) {
						throw err.response.data
					}

					throw err
				})
		},
		{
			refetchOnMount: false,
		}
	)
}
