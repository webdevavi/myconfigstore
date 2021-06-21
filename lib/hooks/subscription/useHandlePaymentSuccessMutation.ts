import { Plans } from "@lib/models"
import axios from "axios"
import { IRazorOrderId } from "razorpay-typescript/dist/resources/order"
import { useMutation, useQueryClient } from "react-query"
import { CURRENT_USER } from "../session"
import { GET_ORDER } from "./useGetOrderQuery"

const HANDLE_PAYMENT_SUCCESS = "handlePaymentSuccess"

export type PaymentSuccessData = {
	plan: Plans
	amount: IRazorOrderId["amount"]
	currency: IRazorOrderId["currency"]
	orderId: string
	razorpayPaymentId: string
	razorpayOrderId: string
	razorpaySignature: string
	notes: IRazorOrderId["notes"]
}

export const useHandlePaymentSuccessMutation = () => {
	const queryClient = useQueryClient()

	return useMutation(HANDLE_PAYMENT_SUCCESS, ({ data }: { data: PaymentSuccessData }) =>
		axios
			.post("/api/payment/razorpay/success", data)
			.then(async () => {
				await queryClient.refetchQueries([GET_ORDER, data.orderId])
				await queryClient.refetchQueries(CURRENT_USER)
			})
			.catch((err) => {
				if (err.response.data) {
					throw err.response.data
				}

				throw err
			})
	)
}
