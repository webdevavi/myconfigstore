import axios from "axios"
import { useQuery } from "react-query"
import { IStore, Store } from "../../models"

export const GET_STORES = "getStores"

export const useGetStoresQuery = () => {
	return useQuery(
		GET_STORES,
		() =>
			axios
				.get<IStore[]>("/api/store/all")
				.then(({ data }) => data.map((store) => new Store(store)))
				.catch((err) => {
					if (err.response.data) {
						throw err.response.data
					}

					throw err
				}),
		{
			refetchOnMount: false,
		}
	)
}
