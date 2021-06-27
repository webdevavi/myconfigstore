import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { ProductJSON, Store, StoreJSON } from "@models"
import { NextApiHandler, NextApiResponse } from "next"

const getStore = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { storeId } = req.query

	const { user, method } = req

	if (method === "GET") {
		try {
			const {
				records: [store],
			} = (await harperdb.searchByConditions(
				[
					{ searchAttribute: "ownerId", searchType: "equals", searchValue: user.id },
					{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId as string },
				],
				{ schema: "dev", table: "stores" }
			)) as unknown as { records: StoreJSON[] }

			if (!store) {
				return res.status(404).json({ message: "No store exists with the provided store id." })
			}

			return res.status(200).json(Store.fromJSON(store))
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else if (method === "DELETE") {
		try {
			// finding the store with the storeId if its owned by the current user
			const {
				records: [store],
			} = (await harperdb.searchByConditions(
				[
					{ searchAttribute: "ownerId", searchType: "equals", searchValue: user.id },
					{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId as string },
				],
				{ schema: "dev", table: "stores" }
			)) as unknown as { records: StoreJSON[] }

			if (!store) {
				return res.status(404).json({ message: "No store exists with the provided store id." })
			}

			const { deleted_hashes } = await harperdb.deleteOne(store.id as string, { schema: "dev", table: "stores" })

			if (!deleted_hashes || !deleted_hashes?.[0]) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			const deletedStoreId = deleted_hashes[0]

			if (!deletedStoreId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			let deletedProductsCount = 0
			let deletedFieldsCount = 0

			// if store has products inside it, we will delete them as well
			if (store.products) {
				const { records: products } = (await harperdb.searchByValue("storeId", store.storeId, { schema: "dev", table: "products" })) as unknown as {
					records: ProductJSON[]
				}

				if (products.length) {
					const { deleted_hashes: del_hashes } = await harperdb.deleteMany(
						products.map(({ id }) => id!),
						{ schema: "dev", table: "products" }
					)

					if (del_hashes?.length) {
						deletedFieldsCount = products
							.filter(({ id }) => del_hashes.includes(id!))
							.map(({ fields }) => fields?.length ?? 0)
							.reduce((prev, curr) => prev + curr)

						deletedProductsCount = del_hashes.length
					}
				}
			}

			await harperdb.updateOne(
				{
					id: user.id,
					usage: {
						...(user.usage ?? {}),
						stores: (user.usage?.stores ?? 1) - 1,
						products: (user.usage?.products ?? deletedProductsCount) - deletedProductsCount,
						fields: (user.usage?.fields ?? deletedFieldsCount) - deletedFieldsCount,
					},
				},
				{
					schema: "dev",
					table: "users",
				}
			)

			return res.status(200).json({ message: `Store ${storeId} destroyed.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(getStore as NextApiHandler)
