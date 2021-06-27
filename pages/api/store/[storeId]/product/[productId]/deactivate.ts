import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { ProductJSON } from "@models"
import { NextApiHandler, NextApiResponse } from "next"

const deactivateProduct = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "PUT") {
		return setStatus(false)(req, res)
	}
	if (req.method === "DELETE") {
		return setStatus(true)(req, res)
	}
	return res.status(404).end()
}

const setStatus = (isActive: boolean) => async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
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
			return res.status(404).json({ message: "No product exists with the provided product id." })
		}

		await harperdb.updateOne({ id: product.id as string, isActive }, { schema: "dev", table: "products" })
		return res.status(200).json({ message: `Product ${productId} ${isActive ? "re-activated" : "deactivated"} successfully.` })
	} catch (err) {
		return res.status(500).json({ message: "Some unexpected error occurred." })
	}
}

export default withAuthentication(deactivateProduct as NextApiHandler)
