import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../lib/middlewares"
import { ProductJSON } from "../../../../../../lib/models"

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
			return res.status(404).json({ message: "No product exists with the provided product id." })
		}

		await db.update({ table: "products", records: [{ id: product.id as string, isActive }] })
		return res.status(200).json({ message: `Product ${productId} ${isActive ? "re-activated" : "deactivated"} successfully.` })
	} catch (err) {
		return res.status(500).json({ message: "Some unexpected error occurred." })
	}
}

export default withAuthentication(deactivateProduct as NextApiHandler)
