import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../lib/middlewares"
import { Product, ProductJSON } from "../../../../../../lib/models"

const getProduct = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "GET") {
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

			return res.status(200).json(Product.fromJSON(product).toObject())
		} catch (err) {
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	}
}

export default withAuthentication(getProduct as NextApiHandler)
