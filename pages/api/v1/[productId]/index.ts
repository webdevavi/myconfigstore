import { NextApiHandler } from "next"
import { HarperDB } from "../../../../lib/harperDB"
import { Product, ProductJSON, StoreJSON } from "../../../../lib/models"
import * as crypto from "crypto"

const handleProduct: NextApiHandler = async (req, res) => {
	const db = new HarperDB("dev")
	const { productId } = req.query

	if (req.method === "GET") {
		try {
			let storeId: string

			const { host } = req.headers
			const splits = (host as string).split(".")

			if (process.env.NODE_ENV === "development") {
				if (splits.length !== 2) {
					return res.status(400).json({ code: "400", message: "Store Id is required" })
				}

				storeId = splits[0]
			} else {
				if (splits.length !== 3) {
					return res.status(400).json({ code: "400", message: "Store Id is required" })
				}

				storeId = splits[0]
			}

			if (!storeId) {
				return res.status(400).json({ code: "400", message: "Store Id is required" })
			}

			const [store] = await db.findByValue<StoreJSON>("storeId", storeId, { table: "stores" })

			if (!store || !store.isActive) {
				return res.status(404).json({ code: "404", message: "No store exists with the provided store id or the store might be inactive." })
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
				return res.status(404).json({ code: "404", message: "No product exists with the provided product id or the product might be inactive." })
			}

			const productJSON = Product.fromJSONWithRawDates(product).toJSON()

			if (product.isPrivate) {
				const { authorization } = req.headers

				if (!/^Bearer\s(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(authorization ?? "")) {
					return res.status(403).json({ code: "403", message: "Not allowed!" })
				}

				const [, authorizationKey] = authorization?.split(/\s/) ?? []

				if (product.isUsingStoreKey) {
					const hasStoreKeyMatched = authorizationKey === store.storeKey

					if (!hasStoreKeyMatched) {
						return res.status(403).json({ code: "403", message: "Not allowed!" })
					}

					return res.status(200).json(productJSON)
				}

				const keys = `${store.storeKey}:${product.productKey}`

				const keysMD5Hash = crypto.createHash("md5").update(keys).digest("hex")

				const haveKeysMatched = authorizationKey === keysMD5Hash

				if (!haveKeysMatched) {
					return res.status(403).json({ code: "403", message: "Not allowed!" })
				}

				return res.status(200).json(productJSON)
			}

			return res.status(200).json(productJSON)
		} catch (err) {
			console.error(err)
			return res.status(500).json({ code: "500", message: "Some internal error occurred at the server." })
		}
	} else {
		return res.status(403).json({ code: "403", message: "Not allowed!" })
	}
}

export default handleProduct
