import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../../lib/middlewares"
import { IAppUser, IStore, Product, ProductJSON, StoreJSON } from "../../../../../lib/models"
import { FieldError } from "../../../../../lib/types"

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

		const db = new HarperDB("dev")

		const [store] = await db.findByConditions<StoreJSON>(
			"and",
			[
				{ attribute: "ownerId", type: "equals", value: req.session.id as string },
				{ attribute: "storeId", type: "equals", value: storeId },
			],

			{ table: "stores" }
		)

		if (!store) {
			return res.status(400).json({ message: "No store exists with the provided store id." })
		}

		const products = await db.findByConditions<ProductJSON>(
			"and",
			[
				{ attribute: "ownerId", type: "equals", value: req.session.id as string },
				{ attribute: "storeId", type: "equals", value: storeId },
				{ attribute: "productId", type: "equals", value: productId as string },
			],

			{ table: "products" }
		)

		if (products && products.length > 0) {
			fieldErrors.push({ field: "productId", error: "This product id is not available." })
		}

		if (fieldErrors.length > 0) {
			return res.status(400).json({ fieldErrors })
		}

		const product = new Product({
			productId: productId as string,
			storeId: storeId as string,
			ownerId: req.session.id as string,
			isPrivate: true,
			isUsingStoreKey: true,
			isActive: true,
		})

		try {
			const [newProductId] = await db.insert({ table: "products", records: [product] })

			if (!newProductId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			await db.update<IStore>({ table: "stores", records: [{ id: store.id as string, products: (store?.products ?? 0) + 1 }] })

			await db.update<IAppUser>({
				table: "users",
				records: [{ id: user.id, usage: { ...(user.usage ?? {}), products: (user.usage?.products ?? 0) + 1 } }],
			})

			return res.status(201).json({ message: `Product ${productId} created successfully.` })
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}
}

export default withAuthentication(createProduct as NextApiHandler)
