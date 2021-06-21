import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { razorpay } from "@lib/razorpay"
import { NextApiHandler, NextApiResponse } from "next"

const getOrder = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { method, user } = req

	if (method === "GET") {
		const { orderId } = req.query as { orderId: string }

		if (!orderId || typeof orderId !== "string") {
			return res.status(400).json({ message: "Invalid order id." })
		}

		const order = await razorpay.orders.fetch(orderId)

		if (!order || order.notes?.user !== user.id) {
			return res.status(404).json({ message: "Order not found." })
		}

		res.status(200).json({ order })
	}

	return res.status(404).end()
}

export default withAuthentication(getOrder as NextApiHandler)
