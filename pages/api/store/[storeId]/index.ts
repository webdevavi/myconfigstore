import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../lib/middlewares"
import { Store, StoreJSON } from "../../../../lib/models"

const getStore = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { storeId } = req.query
	const db = new HarperDB("dev")

	if (req.method === "GET") {
		try {
			const [store] = await db.findByConditions<StoreJSON>(
				"and",
				[
					{ attribute: "ownerId", type: "equals", value: req.session.id as string },
					{ attribute: "storeId", type: "equals", value: storeId as string },
				],

				{ table: "stores" }
			)

			if (!store) {
				return res.status(404).json({ error: "No store exists with the provided store id." })
			}

			return res.status(200).json(Store.fromJSON(store))
		} catch (err) {
			console.error(err)
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	} else if (req.method === "DELETE") {
		try {
			const [store] = await db.findByConditions<StoreJSON>(
				"and",
				[
					{ attribute: "ownerId", type: "equals", value: req.session.id as string },
					{ attribute: "storeId", type: "equals", value: storeId as string },
				],

				{ table: "stores" }
			)

			if (!store) {
				return res.status(404).json({ error: "No store exists with the provided store id." })
			}

			await db.delete([store.id as string], { table: "stores" })
			return res.status(200).json({ message: `Store ${storeId} destroyed.` })
		} catch (err) {
			console.error(err)
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(getStore as NextApiHandler)
