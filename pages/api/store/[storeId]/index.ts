import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../lib/middlewares"
import { IAppUser, ProductJSON, Store, StoreJSON } from "../../../../lib/models"

const getStore = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { storeId } = req.query
	const db = new HarperDB("dev")

	const { user, method } = req

	if (method === "GET") {
		try {
			const [store] = await db.findByConditions<StoreJSON>(
				"and",
				[
					{ attribute: "ownerId", type: "equals", value: user.id },
					{ attribute: "storeId", type: "equals", value: storeId as string },
				],

				{ table: "stores" }
			)

			if (!store) {
				return res.status(404).json({ message: "No store exists with the provided store id." })
			}

			return res.status(200).json(Store.fromJSON(store))
		} catch (err) {
			console.error(err)
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else if (method === "DELETE") {
		try {
			// finding the store with the storeId if its owned by the current user
			const [store] = await db.findByConditions<StoreJSON>(
				"and",
				[
					{ attribute: "ownerId", type: "equals", value: user.id },
					{ attribute: "storeId", type: "equals", value: storeId as string },
				],

				{ table: "stores" }
			)

			if (!store) {
				return res.status(404).json({ message: "No store exists with the provided store id." })
			}

			const [deletedStoreId] = await db.delete([store.id as string], { table: "stores" })

			if (!deletedStoreId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			let deletedProductsCount = 0
			let deletedFieldsCount = 0

			// if store has products inside it, we will delete them as well
			if (store.products) {
				const products = await db.findByValue<ProductJSON>("storeId", store.storeId, { table: "products" })

				if (products.length) {
					const deletedProductsIds = await db.delete(
						products.map(({ id }) => id!),
						{ table: "products" }
					)

					if (deletedProductsIds.length) {
						deletedFieldsCount = products
							.filter(({ id }) => deletedProductsIds.includes(id!))
							.map(({ fields }) => fields?.length ?? 0)
							.reduce((prev, curr) => prev + curr)

						deletedProductsCount = deletedProductsIds.length
					}
				}
			}

			await db.update<IAppUser>({
				table: "users",
				records: [
					{
						id: user.id,
						usage: {
							...(user.usage ?? {}),
							stores: (user.usage?.stores ?? 1) - 1,
							products: (user.usage?.products ?? deletedProductsCount) - deletedProductsCount,
							fields: (user.usage?.fields ?? deletedFieldsCount) - deletedFieldsCount,
						},
					},
				],
			})

			return res.status(200).json({ message: `Store ${storeId} destroyed.` })
		} catch (err) {
			console.error(err)
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(getStore as NextApiHandler)
