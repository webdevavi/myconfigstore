import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { Plans } from "@lib/models"
import { razorpay } from "@lib/razorpay"
import { NextApiHandler, NextApiResponse } from "next"
import pricing from "../../../../pricing.json"

const createOrder = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { method } = req

	if (method === "POST") {
		const { plan } = req.body as { plan: Plans }

		if (!plan || !Object.values(Plans).includes(plan)) {
			return res.status(400).json({ messag: "No plan provided." })
		}

		const pricingPlan = pricing[Object.keys(pricing).find((key) => pricing[key as keyof typeof pricing].label === plan) as keyof typeof pricing]

		if (!pricingPlan) {
			return res.status(400).json({ messag: "No valid plan provided." })
		}

		const order = await razorpay.orders.create({
			amount: (pricingPlan?.bill ?? 0) * 100,
			currency: "USD",
			notes: {
				plan,
				description: `Payment for ${plan.toUpperCase()} plan`,
			},
		})

		res.status(201).json({ order })
	}

	return res.status(404).end()
}

export default withAuthentication(createOrder as NextApiHandler)
