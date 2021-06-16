import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../../lib/middlewares"
import { Field, IField, ProductJSON } from "../../../../../../../lib/models"
import { FieldError } from "../../../../../../../lib/types"

const createField = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const fieldErrors: FieldError[] = []
	if (req.method === "POST") {
		const { storeId, productId } = req.query
		const { key, value, isEncrypted } = req.body as IField

		if (!storeId || typeof storeId !== "string") {
			return res.status(400).json({ error: "A valid store id is required." })
		}

		if (!productId || typeof productId !== "string") {
			return res.status(400).json({ error: "A valid product id is required." })
		}

		if (!key) {
			fieldErrors.push({ field: "key", error: "Field key is required" })
		}

		if (!/^[a-zA-Z0-9_]*$/.test(key!)) {
			fieldErrors.push({ field: "key", error: "Only alphabets, numbers and underscore is allowed." })
		}

		if (!value) {
			fieldErrors.push({ field: "value", error: "Field value is required" })
		}

		const db = new HarperDB("dev")

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
			return res.status(400).json({ error: "No product exists with the provided store id." })
		}

		if (product.fields?.find((field) => field.key === key)) {
			fieldErrors.push({ field: "key", error: "A value with this key already exists." })
		}

		if (fieldErrors.length > 0) {
			return res.status(400).json({ fieldErrors })
		}

		const field = new Field({
			key,
			value,
			isEncrypted: Boolean(isEncrypted),
		})

		if (product.fields?.length && product.fields.length > 0) {
			product.fields.push(field)
		} else {
			product.fields = [field]
		}

		const { id, fields } = product

		try {
			await db.update({ table: "products", records: [{ id: id as string, fields }] })
			return res.status(201).json({ message: `Field ${key} created successfully.` })
		} catch (err) {
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	}
}

export default withAuthentication(createField as NextApiHandler)
