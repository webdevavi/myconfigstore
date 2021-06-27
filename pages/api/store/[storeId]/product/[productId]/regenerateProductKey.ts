import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { ProductJSON } from "@models"
import * as crypto from "crypto"
import { NextApiHandler, NextApiResponse } from "next"

const regenerateProductKey = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "PATCH") {
		const { storeId, productId } = req.query

		try {
			const {
				records: [product],
			} = (await harperdb.searchByConditions(
				[
					{ searchAttribute: "ownerId", searchType: "equals", searchValue: req.session.id as string },
					{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId as string },
					{ searchAttribute: "productId", searchType: "equals", searchValue: productId as string },
				],
				{ schema: "dev", table: "products" }
			)) as unknown as { records: ProductJSON[] }

			if (!product) {
				return res.status(400).json({ message: "No product exists with the provided product id." })
			}

			const productKey = crypto.randomBytes(64).toString("base64")

			await harperdb.updateOne({ id: product.id as string, productKey }, { schema: "dev", table: "products" })
			return res.status(201).json({ message: `Key for product ${productId} regenerated successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(regenerateProductKey as NextApiHandler)
