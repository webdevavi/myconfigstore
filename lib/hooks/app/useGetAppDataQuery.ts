import { AppData, IAppData } from "@lib/models/appData"
import { StoreDataJSON } from "@lib/models/storeData"
import axios from "axios"
import { useQuery } from "react-query"

const GET_APP_DATA = "getAppData"

export const useGetAppDataQuery = () => {
	return useQuery(GET_APP_DATA, () =>
		axios
			.get<StoreDataJSON<IAppData>>("https://official.myconfig.store/api/v1/app", {
				headers: {
					Authorization: "Bearer 0769d0e49fba68ab0dfe33a742be5148",
				},
			})
			.then(({ data }) => new AppData(data.data))
	)
}
