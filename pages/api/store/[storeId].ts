import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../lib/middlewares"
import { Store, StoreJSON } from "../../../lib/models"

const getStore = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "GET") {
		const { storeId } = req.query
		const db = new HarperDB("dev")

		try {
			const [store] = await db.findByConditions<StoreJSON>(
				"and",
				[
					{ attribute: "ownerId", type: "equals", value: req.session.id as string },
					{ attribute: "storeId", type: "equals", value: storeId as string },
				],

				{ table: "stores" }
			)

			return res.status(200).json(Store.fromJSON(store))
		} catch (err) {
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	}
}

export default withAuthentication(getStore as NextApiHandler)
