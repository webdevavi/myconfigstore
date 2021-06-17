import * as crypto from "crypto"
import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../lib/middlewares"
import { ProductJSON } from "../../../../../../lib/models"

const regenerateProductKey = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "PATCH") {
		const { storeId, productId } = req.query
		const db = new HarperDB("dev")

		try {
			const [product] = await db.findByConditions<ProductJSON>(
				"and",
				[
					{ attribute: "ownerId", type: "equals", value: req.session.id as string },
					{ attribute: "storeId", type: "equals", value: storeId as string },
					{ attribute: "productId", type: "equals", value: productId as string },
				],

				{ table: "products" }
			)

			if (!product) {
				return res.status(400).json({ error: "No product exists with the provided product id." })
			}

			const productKey = crypto.randomBytes(64).toString("base64")

			await db.update({ table: "products", records: [{ id: product.id as string, productKey }] })
			return res.status(201).json({ message: `Key for product ${productId} regenerated successfully.` })
		} catch (err) {
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(regenerateProductKey as NextApiHandler)
