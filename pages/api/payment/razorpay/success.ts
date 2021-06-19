/* eslint-disable camelcase */
import { HarperDB } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { AppUserJSON, PaymentStatus, Plans } from "@lib/models"
import { PaymentJSON } from "@lib/models/payment"
import { razorpay } from "@lib/razorpay"
import * as crypto from "crypto"
import { add } from "date-fns"
import { NextApiHandler, NextApiResponse } from "next"
import pricing from "../../../../pricing.json"

const handleSuccess = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { method, user } = req

	if (method === "POST") {
		const { plan, amount, currency, couponUsed, discount, orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body as Record<
			string,
			string
		>

		const pricingPlan = pricing[Object.keys(pricing).find((key) => pricing[key as keyof typeof pricing].label === plan) as keyof typeof pricing]

		const signature = crypto
			.createHmac("sha256", process.env.RZP_API_SECRET as string)
			.update(`${orderId}|${razorpay_payment_id}`)
			.digest("hex")

		if (signature !== razorpay_signature) {
			return res.status(400).json({ message: "Payment couldn't be verified." })
		}

		const payment: Omit<PaymentJSON, "id" | "__createdtime__" | "__updatedtime__"> = {
			userId: user.id,
			plan: plan as Plans,
			amount: (amount as unknown as number) / 100,
			currency,
			couponUsed,
			discount: discount as unknown as number,
			razorpayOrderId: razorpay_order_id,
			razorpayPaymentId: razorpay_payment_id,
		}

		const db = new HarperDB("dev")

		const [paymentId] = await db.insert<Omit<PaymentJSON, "id" | "__createdtime__" | "__updatedtime__">>({ table: "payments", records: [payment] })

		if (!paymentId) {
			await razorpay.payments.payment(razorpay_payment_id).refund({
				reverse_all: 1,
			})

			return res.status(500).json({ message: "Something's wrong on our side, your payment will be refunded in 4-5 working days if paid." })
		}

		await db.update<AppUserJSON>({
			table: "users",
			records: [
				{
					id: user.id,
					subscription: {
						...user.subscription,
						plan: plan as Plans,
						expiry: add(new Date(), { days: pricingPlan.days ?? 30 }).getTime(),
						status: PaymentStatus.Paid,
					},
				},
			],
		})

		return res.status(200).json({ message: `Thanks for subscribing for ${plan} plan` })
	}

	return res.status(404).end()
}

export default withAuthentication(handleSuccess as NextApiHandler)
