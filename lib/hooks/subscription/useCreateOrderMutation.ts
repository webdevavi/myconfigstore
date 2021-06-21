import { Plans } from "@models"
import axios from "axios"
import { IRazorOrderId } from "razorpay-typescript/dist/resources/order"
import { useMutation } from "react-query"

const CREATE_ORDER = "createOrder"

export const useCreateOrderMutation = () => {
	return useMutation(CREATE_ORDER, ({ plan, coupon }: { plan: Plans; coupon?: string }) =>
		axios.post<{ order: IRazorOrderId }>("/api/payment/razorpay/create-order", { plan, coupon }).catch((err) => {
			if (err.response.data) {
				throw err.response.data
			}

			throw err
		})
	)
}
