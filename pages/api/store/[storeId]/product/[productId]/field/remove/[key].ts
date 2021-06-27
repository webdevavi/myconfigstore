import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { ProductJSON } from "@models"
import { NextApiHandler, NextApiResponse } from "next"

const removeField = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { user, method } = req

	if (method === "POST") {
		const { storeId, productId, key } = req.query

		if (!storeId || typeof storeId !== "string") {
			return res.status(400).json({ message: "A valid store id is required." })
		}

		if (!productId || typeof productId !== "string") {
			return res.status(400).json({ message: "A valid product id is required." })
		}

		if (!key || typeof key !== "string") {
			return res.status(400).json({ message: "A valid field key is required." })
		}

		if (!/^[a-zA-Z0-9_]*$/.test(key)) {
			return res.status(400).json({ message: "Only alphabets, numbers and underscore is allowed." })
		}

		const {
			records: [product],
		} = (await harperdb.searchByConditions(
			[
				{ searchAttribute: "ownerId", searchType: "equals", searchValue: user.id },
				{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId as string },
				{ searchAttribute: "productId", searchType: "equals", searchValue: productId as string },
			],
			{ schema: "dev", table: "products" }
		)) as unknown as { records: ProductJSON[] }

		if (!product) {
			return res.status(400).json({ message: "No product exists with the provided product id." })
		}

		const index = product.fields?.findIndex((field) => field.key === key)

		if (typeof index === "undefined" || index === -1) {
			return res.status(400).json({ message: `Value with key ${key} doesn't exist.` })
		}

		if (product.fields) product.fields.splice(index, 1)

		const { id, fields } = product

		try {
			const { update_hashes } = await harperdb.updateOne({ id: id as string, fields }, { schema: "dev", table: "products" })

			if (!update_hashes || !update_hashes[0]) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			await harperdb.updateOne(
				{ id: user.id, usage: { ...(user.usage ?? {}), fields: (user.usage?.fields ?? 1) - 1 } },
				{
					schema: "dev",
					table: "users",
				}
			)

			return res.status(201).json({ message: `Field ${key} removed successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
	return res.status(404).end()
}

export default withAuthentication(removeField as NextApiHandler)
