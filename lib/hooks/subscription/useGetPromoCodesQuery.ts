import { PromoCode } from "@lib/models/promoCode"
import { StoreDataJSON } from "@lib/models/storeData"
import axios from "axios"
import { useQuery } from "react-query"

export const GET_PROMO_CODES = "getPromoCodes"

export const useGetPromoCodesQuery = () => {
	return useQuery(
		GET_PROMO_CODES,
		() =>
			axios
				.get<StoreDataJSON>("https://official.myconfig.store/api/v1/promo_codes", {
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_PROMO_CODES_STORE_KEY}`,
					},
				})
				.then(({ data }) => PromoCode.fromStore(data))
				.catch((err) => {
					if (err.response.data) {
						throw err.response.data
					}

					throw err
				}),
		{
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		}
	)
}
