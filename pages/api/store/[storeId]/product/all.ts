import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { Product, ProductJSON } from "@models"
import orderBy from "lodash/orderBy"
import { NextApiHandler, NextApiResponse } from "next"

const getAllProducts = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "GET") {
		const { storeId } = req.query

		try {
			const { records: products } = (await harperdb.searchByConditions(
				[
					{ searchAttribute: "ownerId", searchType: "equals", searchValue: req.session.id as string },
					{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId as string },
				],
				{ schema: "dev", table: "products" }
			)) as unknown as { records: ProductJSON[] }

			return res.status(200).json(orderBy(products, ["__updatedtime__"], ["desc"]).map((product) => Product.fromJSON(product).toObject()))
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
	return res.status(404).end()
}

export default withAuthentication(getAllProducts as NextApiHandler)
