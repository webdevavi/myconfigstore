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
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_DATA_STORE_KEY}`,
				},
			})
			.then(({ data }) => new AppData(data.data))
	)
}
