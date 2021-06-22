import { HarperDB } from "@lib/harperDB"
import { AppUser, AppUserJSON, Product, ProductJSON, StoreJSON } from "@models"
import * as crypto from "crypto"
import { NextApiHandler } from "next"
import NextCors from "nextjs-cors"

const handleProduct: NextApiHandler = async (req, res) => {
	await NextCors(req, res, {
		methods: ["GET"],
		origin: "*",
	})

	const db = new HarperDB("dev")
	const { productId } = req.query

	if (req.method === "GET") {
		try {
			let storeId: string

			const { host } = req.headers
			const splits = (host as string).split(".")

			if (process.env.NODE_ENV === "development") {
				if (splits.length !== 2) {
					return res.status(400).json({ error: { code: "400", message: "Store Id is required" } })
				}

				;[storeId] = splits
			} else {
				if (splits.length !== 3) {
					return res.status(400).json({ error: { code: "400", message: "Store Id is required" } })
				}

				;[storeId] = splits
			}

			if (!storeId) {
				return res.status(400).json({ error: { code: "400", message: "Store Id is required" } })
			}

			const [store] = await db.findByValue<StoreJSON>("storeId", storeId, { table: "stores" })

			if (!store || !store.isActive) {
				return res.status(404).json({ error: { code: "404", message: "No store exists with the provided store id or the store might be inactive." } })
			}

			const [user] = await db.findByIds<AppUserJSON>([store.ownerId], { table: "users" })

			if (!user) {
				return res.status(404).json({ error: { code: "404", message: "The owner of this store does not exist anymore." } })
			}

			const appUser = AppUser.fromJSON(user)

			if (!appUser.canUseAPIEndpoints) {
				return res.status(403).json({
					error: { code: "403", message: "Your subscription plan has expired, please upgrade / renew your plan to continue using your store." },
				})
			}

			const [product] = await db.findByConditions<ProductJSON>(
				"and",
				[
					{ attribute: "storeId", type: "equals", value: storeId as string },
					{ attribute: "productId", type: "equals", value: productId as string },
				],

				{ table: "products" }
			)

			if (!product || !product.isActive) {
				return res
					.status(404)
					.json({ error: { code: "404", message: "No product exists with the provided product id or the product might be inactive." } })
			}

			const productJSON = Product.fromJSONWithRawDates(product).toJSON()

			if (product.isPrivate) {
				const { authorization } = req.headers

				if (!/^Bearer\s(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(authorization ?? "")) {
					return res.status(403).json({ error: { code: "403", message: "Not allowed!" } })
				}

				const [, authorizationKey] = authorization?.split(/\s/) ?? []

				if (product.isUsingStoreKey) {
					const hasStoreKeyMatched = authorizationKey === store.storeKey

					if (!hasStoreKeyMatched) {
						return res.status(403).json({ error: { code: "403", message: "Not allowed!" } })
					}

					return res.status(200).json(productJSON)
				}

				const keys = `${store.storeKey}:${product.productKey}`

				const keysMD5Hash = crypto.createHash("md5").update(keys).digest("hex")

				const haveKeysMatched = authorizationKey === keysMD5Hash

				if (!haveKeysMatched) {
					return res.status(403).json({ error: { code: "403", message: "Not allowed!" } })
				}

				return res.status(200).json(productJSON)
			}

			return res.status(200).json(productJSON)
		} catch (err) {
			return res.status(500).json({ error: { code: "500", message: "Some internal error occurred at the server." } })
		}
	} else {
		return res.status(403).json({ error: { code: "403", message: "Not allowed!" } })
	}
}

export default handleProduct
