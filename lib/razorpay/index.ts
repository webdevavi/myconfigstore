import { Razorpay } from "razorpay-typescript"

export const razorpay = new Razorpay({
	authKey: {
		key_id: process.env.NEXT_PUBLIC_RZP_API_KEY ?? "",
		key_secret: process.env.RZP_API_SECRET ?? "",
	},
})
