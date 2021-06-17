import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../lib/middlewares"
import { Product, ProductJSON } from "../../../../../lib/models"

const getAllProducts = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "GET") {
		const { storeId } = req.query

		const db = new HarperDB("dev")

		try {
			const products = await db.findByConditions<ProductJSON>(
				"and",
				[
					{ attribute: "ownerId", type: "equals", value: req.session.id as string },
					{ attribute: "storeId", type: "equals", value: storeId as string },
				],

				{ table: "products" }
			)

			return res.status(200).json(products.map((product) => Product.fromJSON(product).toObject()))
		} catch (err) {
			console.error(err)
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
}

export default withAuthentication(getAllProducts as NextApiHandler)
