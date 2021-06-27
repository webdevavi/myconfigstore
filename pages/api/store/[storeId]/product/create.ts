import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { ProductJSON, StoreJSON } from "@models"
import { FieldError } from "@types"
import { NextApiHandler, NextApiResponse } from "next"

const createProduct = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { user } = req

	const fieldErrors: FieldError[] = []
	if (req.method === "POST") {
		const { storeId } = req.query
		const { productId } = req.body as { productId: string | undefined }

		if (!user.canCreateNewProduct) {
			return res.status(403).json({ message: "You have completely consumed your current subscription plan, please upgrade to create more products." })
		}

		if (!storeId || typeof storeId !== "string") {
			return res.status(400).json({ message: "Store id is required." })
		}

		if (!productId || typeof productId !== "string") {
			fieldErrors.push({ field: "productId", error: "A valid product Id is required." })
		}

		if (!/^[a-zA-Z0-9_]*$/.test(productId!)) {
			fieldErrors.push({ field: "productId", error: "Only alphabets, numbers and underscore is allowed." })
		}

		const {
			records: [store],
		} = (await harperdb.searchByConditions(
			[
				{ searchAttribute: "ownerId", searchType: "equals", searchValue: req.session.id as string },
				{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId },
			],
			{ schema: "dev", table: "stores" }
		)) as unknown as { records: StoreJSON[] }

		if (!store) {
			return res.status(400).json({ message: "No store exists with the provided store id." })
		}

		const { records: products } = (await harperdb.searchByConditions(
			[
				{ searchAttribute: "ownerId", searchType: "equals", searchValue: req.session.id as string },
				{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId },
				{ searchAttribute: "productId", searchType: "equals", searchValue: productId as string },
			],
			{ schema: "dev", table: "products" }
		)) as unknown as { records: ProductJSON[] }

		if (products && products.length > 0) {
			fieldErrors.push({ field: "productId", error: "This product id is not available." })
		}

		if (fieldErrors.length > 0) {
			return res.status(400).json({ fieldErrors })
		}

		const product = {
			productId: productId as string,
			storeId: storeId as string,
			ownerId: user.id as string,
			isPrivate: true,
			isUsingStoreKey: true,
			isActive: true,
		}

		try {
			const { inserted_hashes } = await harperdb.insert(product, { schema: "dev", table: "products" })

			if (!inserted_hashes || !inserted_hashes[0]) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			res.status(201).json({ message: `Product ${productId} created successfully.` })

			await harperdb.updateOne({ id: store.id as string, products: (store?.products ?? 0) + 1 }, { schema: "dev", table: "stores" })

			return await harperdb.updateOne(
				{ id: user.id, usage: { ...(user.usage ?? {}), products: (user.usage?.products ?? 0) + 1 } },
				{
					schema: "dev",
					table: "users",
				}
			)
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
	return res.status(404).end()
}

export default withAuthentication(createProduct as NextApiHandler)
