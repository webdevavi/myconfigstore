import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { IProduct, ProductJSON } from "@models"
import crypto from "crypto"
import { NextApiHandler, NextApiResponse } from "next"

const updateProductSettings = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { storeId, productId } = req.query
		const { isPrivate, isUsingStoreKey } = req.body as Pick<IProduct, "isPrivate" | "isUsingStoreKey">

		if (!storeId || typeof storeId !== "string") {
			return res.status(400).json({ message: "A valid store id is required." })
		}

		if (!productId || typeof productId !== "string") {
			return res.status(400).json({ message: "A valid product id is required." })
		}

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

		let { productKey } = product

		if (isPrivate && !isUsingStoreKey && !productKey) {
			productKey = crypto.randomBytes(64).toString("base64")
		}

		try {
			await harperdb.updateOne({ id: product.id as string, isPrivate, isUsingStoreKey, productKey }, { schema: "dev", table: "products" })
			return res.status(201).json({ message: `Settings for product ${productId} updated successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
	return res.status(404).end()
}

export default withAuthentication(updateProductSettings as NextApiHandler)
