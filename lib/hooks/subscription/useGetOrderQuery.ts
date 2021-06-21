import axios from "axios"
import { IRazorOrderId } from "razorpay-typescript/dist/resources/order"
import { useQuery } from "react-query"

export const GET_ORDER = "getOrder"

export const useGetOrderQuery = ({ orderId }: { orderId?: string | null }) => {
	return useQuery(
		[GET_ORDER, orderId],
		() => {
			if (!orderId) return null

			return axios
				.get<{ order: IRazorOrderId }>(`/api/payment/razorpay/order/${orderId}`)
				.then(({ data }) => data?.order)
				.catch((err) => {
					if (err.response.data) {
						throw err.response.data
					}

					throw err
				})
		},
		{
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		}
	)
}
