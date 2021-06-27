import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { StoreJSON } from "@models"
import * as crypto from "crypto"
import { NextApiHandler, NextApiResponse } from "next"

const regenerateStoreKey = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "PATCH") {
		const { storeId } = req.query

		try {
			const {
				records: [store],
			} = (await harperdb.searchByConditions(
				[
					{ searchAttribute: "ownerId", searchType: "equals", searchValue: req.session.id as string },
					{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId as string },
				],

				{ schema: "dev", table: "stores" }
			)) as unknown as { records: StoreJSON[] }

			if (!store) {
				return res.status(404).json({ message: "No store exists with the provided store id." })
			}

			const storeKey = crypto.randomBytes(64).toString("base64")

			await harperdb.updateOne({ id: store.id as string, storeKey }, { schema: "dev", table: "stores" })
			return res.status(201).json({ message: `Key for store ${storeId} regenerated successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(regenerateStoreKey as NextApiHandler)
