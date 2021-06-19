import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../../../lib/middlewares"
import { IAppUser, ProductJSON } from "../../../../../../../../lib/models"

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

		const db = new HarperDB("dev")

		const [product] = await db.findByConditions<ProductJSON>(
			"and",
			[
				{ attribute: "ownerId", type: "equals", value: user.id },
				{ attribute: "storeId", type: "equals", value: storeId as string },
				{ attribute: "productId", type: "equals", value: productId as string },
			],

			{ table: "products" }
		)

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
			const [updatedProductId] = await db.update({ table: "products", records: [{ id: id as string, fields }] })

			if (!updatedProductId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			await db.update<IAppUser>({
				table: "users",
				records: [{ id: user.id, usage: { ...(user.usage ?? {}), fields: (user.usage?.fields ?? 1) - 1 } }],
			})

			return res.status(201).json({ message: `Field ${key} removed successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
	return res.status(404).end()
}

export default withAuthentication(removeField as NextApiHandler)
