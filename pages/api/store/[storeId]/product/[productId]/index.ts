import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../lib/middlewares"
import { Product, ProductJSON } from "../../../../../../lib/models"

const getProduct = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { storeId, productId } = req.query
	const db = new HarperDB("dev")

	if (req.method === "GET") {
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

			return res.status(200).json(Product.fromJSON(product).toObject())
		} catch (err) {
			console.error(err)
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	} else if (req.method === "DELETE") {
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

			await db.delete([product.id as string], { table: "products" })
			return res.status(200).json({ message: `Product ${productId} destroyed.` })
		} catch (err) {
			console.error(err)
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(getProduct as NextApiHandler)
