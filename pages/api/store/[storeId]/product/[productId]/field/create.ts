import { NextApiHandler, NextApiResponse } from "next"
import { Encrypt } from "../../../../../../../lib/encrypt"
import { HarperDB } from "../../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../../lib/middlewares"
import { Field, IAppUser, IField, ProductJSON } from "../../../../../../../lib/models"
import { FieldError } from "../../../../../../../lib/types"

const createField = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { user, method } = req

	const fieldErrors: FieldError[] = []
	if (method === "POST") {
		const { storeId, productId } = req.query
		const { key, value, isEncrypted } = req.body as IField

		if (!user.canCreateNewField) {
			return res.status(403).json({ message: "You have completely consumed your current subscription plan, please upgrade to add more fields." })
		}

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
			return res.status(400).json({ message: "No product exists with the provided store id." })
		}

		if (product.fields?.find((field) => field.key === key)) {
			fieldErrors.push({ field: "key", error: "A value with this key already exists." })
		}

		if (fieldErrors.length > 0) {
			return res.status(400).json({ fieldErrors })
		}

		let field: Field

		if (isEncrypted) {
			const encryption = new Encrypt()

			field = new Field({
				key,
				value: encryption.encrypt(value),
				isEncrypted: Boolean(isEncrypted),
			})
		} else {
			field = new Field({
				key,
				value,
				isEncrypted: Boolean(isEncrypted),
			})
		}

		if (product.fields?.length && product.fields.length > 0) {
			product.fields.push(field)
		} else {
			product.fields = [field]
		}

		const { id, fields } = product

		try {
			const [newFieldId] = await db.update({ table: "products", records: [{ id: id as string, fields }] })

			if (!newFieldId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			await db.update<IAppUser>({
				table: "users",
				records: [{ id: user.id, usage: { ...(user.usage ?? {}), fields: (user.usage?.fields ?? 0) + 1 } }],
			})

			return res.status(201).json({ message: `Field ${key} created successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
}

export default withAuthentication(createField as NextApiHandler)
