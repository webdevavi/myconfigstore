import * as crypto from "crypto"
import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../lib/middlewares"
import { StoreJSON } from "../../../../lib/models"

const regenerateStoreKey = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "PATCH") {
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

			if (!store) {
				return res.status(404).json({ message: "No store exists with the provided store id." })
			}

			const storeKey = crypto.randomBytes(64).toString("base64")

			await db.update({ table: "stores", records: [{ id: store.id as string, storeKey }] })
			return res.status(201).json({ message: `Key for store ${storeId} regenerated successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(regenerateStoreKey as NextApiHandler)
