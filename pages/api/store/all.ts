import orderBy from "lodash/orderBy"
import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../lib/middlewares"
import { Store, StoreJSON } from "../../../lib/models"

const getAllStores = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "GET") {
		const db = new HarperDB("dev")

		try {
			const stores = await db.findByValue<StoreJSON>("ownerId", req.session.id as string, { table: "stores" })

			return res.status(200).json(orderBy(stores, ["__updatedtime__"], ["desc"]).map((store) => Store.fromJSON(store)))
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}

	return res.status(404).end()
}

export default withAuthentication(getAllStores as NextApiHandler)
