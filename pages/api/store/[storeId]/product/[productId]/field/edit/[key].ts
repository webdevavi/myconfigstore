import { Encrypt } from "@lib/encrypt"
import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { Field, IField, ProductJSON } from "@models"
import { FieldError } from "@types"
import { NextApiHandler, NextApiResponse } from "next"

const createField = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const fieldErrors: FieldError[] = []
	if (req.method === "POST") {
		const { storeId, productId, key: ogKey } = req.query
		const { key, value, isEncrypted } = req.body as IField

		if (!storeId || typeof storeId !== "string") {
			return res.status(400).json({ message: "A valid store id is required." })
		}

		if (!productId || typeof productId !== "string") {
			return res.status(400).json({ message: "A valid product id is required." })
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

		const index = product.fields?.findIndex((field) => field.key === ogKey)

		if (typeof index === "undefined" || index === -1) {
			fieldErrors.push({ field: "key", error: `Value with key ${ogKey} doesn't exist.` })
		}

		if (fieldErrors.length > 0) {
			return res.status(400).json({ fieldErrors })
		}

		let updatedField: Field

		if (isEncrypted) {
			const encryption = new Encrypt()

			updatedField = new Field({
				key,
				value: encryption.encrypt(value),
				isEncrypted: Boolean(isEncrypted),
			})
		} else {
			updatedField = new Field({
				key,
				value,
				isEncrypted: Boolean(isEncrypted),
			})
		}

		product.fields![index!] = updatedField

		const { id, fields } = product

		try {
			await harperdb.updateOne({ id: id as string, fields }, { schema: "dev", table: "products" })
			return res.status(201).json({ message: `Field ${key} updated successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
	return res.status(404).end()
}

export default withAuthentication(createField as NextApiHandler)
