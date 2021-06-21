import { Payment, PaymentJSON } from "@lib/models/payment"
import axios from "axios"
import { useQuery } from "react-query"

export const GET_ALL_PAYMENTS = "getAllPayments"

export const useGetAllPaymentsQuery = () => {
	return useQuery(
		GET_ALL_PAYMENTS,
		() => {
			return axios
				.get<{ payments: PaymentJSON[] }>("/api/payment/all")
				.then(({ data }) => data?.payments.map((payment) => Payment.fromJSON(payment)))
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
		}
	)
}
