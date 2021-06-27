import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { Product, ProductJSON, StoreJSON } from "@models"
import { NextApiHandler, NextApiResponse } from "next"

const getProduct = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { storeId, productId } = req.query
	const { user, method } = req

	if (method === "GET") {
		try {
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

			return res.status(200).json(Product.fromJSON(product).toObject())
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else if (method === "DELETE") {
		try {
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
				return res.status(400).json({ error: "No product exists with the provided product id." })
			}

			const { deleted_hashes } = await harperdb.deleteOne(product.id as string, { schema: "dev", table: "products" })

			if (!deleted_hashes || !deleted_hashes[0]) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			const deletedFieldsCount = product.fields?.length ?? 0

			const {
				records: [store],
			} = (await harperdb.searchByValue("storeId", storeId as string, { schema: "dev", table: "stores" })) as unknown as { records: StoreJSON[] }

			if (store) await harperdb.updateOne({ id: store.id as string, products: (store?.products ?? 1) - 1 }, { schema: "dev", table: "stores" })

			await harperdb.updateOne(
				{
					id: user.id,
					usage: {
						...(user.usage ?? {}),
						products: (user.usage?.products ?? 1) - 1,
						fields: (user.usage?.fields ?? deletedFieldsCount) - deletedFieldsCount,
					},
				},
				{
					schema: "dev",
					table: "users",
				}
			)

			return res.status(200).json({ message: `Product ${productId} destroyed.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(getProduct as NextApiHandler)
