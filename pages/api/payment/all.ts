import { HarperDB } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { PaymentJSON } from "@lib/models/payment"
import orderBy from "lodash/orderBy"
import { NextApiHandler, NextApiResponse } from "next"

const getAllPayments = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { method, user } = req

	if (method === "GET") {
		const db = new HarperDB("dev")

		const payments = await db.findByValue<PaymentJSON>("userId", user.id, { table: "payments" })

		if (!payments) {
			return res.status(404).json({ message: "No payment history found." })
		}

		res.status(200).json({ payments: orderBy(payments, ["__createdtime__"], ["desc"]) })
	}

	return res.status(404).end()
}

export default withAuthentication(getAllPayments as NextApiHandler)
