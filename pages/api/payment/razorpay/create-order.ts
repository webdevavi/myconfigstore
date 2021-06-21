import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { Plans } from "@lib/models"
import { PromoCode } from "@lib/models/promoCode"
import { StoreDataJSON } from "@lib/models/storeData"
import { razorpay } from "@lib/razorpay"
import axios from "axios"
import { NextApiHandler, NextApiResponse } from "next"
import pricing from "../../../../pricing.json"

const createOrder = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { method, user } = req

	if (method === "POST") {
		const { plan, coupon } = req.body as { plan: Plans; coupon?: string }

		if (!plan || !Object.values(Plans).includes(plan)) {
			return res.status(400).json({ messag: "No plan provided." })
		}

		const pricingPlan = pricing[Object.keys(pricing).find((key) => pricing[key as keyof typeof pricing].label === plan) as keyof typeof pricing]

		if (!pricingPlan) {
			return res.status(400).json({ messag: "No valid plan provided." })
		}

		let amount = (pricingPlan?.bill ?? 0) * 100

		const notes = {
			plan,
			description: `Payment for ${plan.toUpperCase()} plan`,
			user: user.id,
		}

		if (coupon) {
			const coupons = await axios
				.get<StoreDataJSON>("https://official.myconfig.store/api/v1/promo_codes", {
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_PROMO_CODES_STORE_KEY}`,
					},
				})
				.then(({ data }) => PromoCode.fromStore(data))

			if (!coupons) {
				return res.status(400).json({ messag: "Coupon code could not be validated." })
			}

			const validPromoCode = coupons?.find(({ code }) => code.toLowerCase() === coupon.toLowerCase())

			if (!validPromoCode) {
				return res.status(400).json({ messag: "Coupon code could not be validated." })
			}

			const discount = (validPromoCode.discount / 100) * amount

			amount -= discount

			// @ts-ignore
			notes.couponUsed = coupon
			// @ts-ignore
			notes.discount = discount
		}

		const order = await razorpay.orders.create({
			amount,
			notes,
			currency: "USD",
			receipt: user.email,
		})

		res.status(201).json({ order })
	}

	return res.status(404).end()
}

export default withAuthentication(createOrder as NextApiHandler)
