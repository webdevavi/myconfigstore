import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../../lib/middlewares"
import { IAppUser, IStore, Product, ProductJSON } from "../../../../../../lib/models"

const getProduct = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { storeId, productId } = req.query
	const db = new HarperDB("dev")

	const { user, method } = req

	if (method === "GET") {
		try {
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

			return res.status(200).json(Product.fromJSON(product).toObject())
		} catch (err) {
			console.error(err)
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else if (method === "DELETE") {
		try {
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
				return res.status(400).json({ error: "No product exists with the provided product id." })
			}

			const [deletedProductId] = await db.delete([product.id as string], { table: "products" })

			if (!deletedProductId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			const deletedFieldsCount = product.fields?.length ?? 0

			const [store] = await db.findByValue<IStore>("storeId", storeId as string, { table: "stores" })

			if (store) await db.update<IStore>({ table: "stores", records: [{ id: store.id as string, products: (store?.products ?? 1) - 1 }] })

			await db.update<IAppUser>({
				table: "users",
				records: [
					{
						id: user.id,
						usage: {
							...(user.usage ?? {}),
							products: (user.usage?.products ?? 1) - 1,
							fields: (user.usage?.fields ?? deletedFieldsCount) - deletedFieldsCount,
						},
					},
				],
			})

			return res.status(200).json({ message: `Product ${productId} destroyed.` })
		} catch (err) {
			console.error(err)
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	} else return res.status(404).end()
}

export default withAuthentication(getProduct as NextApiHandler)
