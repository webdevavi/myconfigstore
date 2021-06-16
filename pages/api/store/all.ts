import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../lib/middlewares"
import { Store, StoreJSON } from "../../../lib/models"

const getAllStores = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "GET") {
		const db = new HarperDB("dev")

		try {
			const stores = await db.findByValue<StoreJSON>("ownerId", req.session.id as string, { table: "stores" })

			return res.status(200).json(stores.map((store) => Store.fromJSON(store)))
		} catch (err) {
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	}
}

export default withAuthentication(getAllStores as NextApiHandler)
