import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { Store, StoreJSON } from "@models"
import { FieldError } from "@types"
import * as crypto from "crypto"
import { NextApiHandler, NextApiResponse } from "next"

const createStore = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const fieldErrors: FieldError[] = []
	if (req.method === "POST") {
		const { user } = req

		if (!user.canCreateNewStore) {
			return res.status(403).json({ message: "You have completely consumed your current subscription plan, please upgrade to create more stores." })
		}

		const { storeId } = req.body as { storeId: string | undefined }

		if (!storeId || typeof storeId !== "string") {
			fieldErrors.push({ field: "storeId", error: "A valid store Id is required." })
		}

		if (!/^[a-zA-Z0-9_]*$/.test(storeId!)) {
			fieldErrors.push({ field: "storeId", error: "Only alphabets, numbers and underscore is allowed." })
		}

		const { records: stores } = (await harperdb.searchByValue("storeId", storeId!, { schema: "dev", table: "stores" })) as unknown as {
			records: StoreJSON[]
		}

		if (stores && stores.length > 0) {
			fieldErrors.push({ field: "storeId", error: "This store id is not available." })
		}

		if (fieldErrors.length > 0) {
			return res.status(400).json({ fieldErrors })
		}

		const storeKey = crypto.randomBytes(64).toString("base64")

		const store = new Store({ storeId: storeId!, ownerId: user.id, storeKey, isActive: true })

		try {
			const { inserted_hashes } = await harperdb.insert(store, { schema: "dev", table: "stores" })

			if (!inserted_hashes || !inserted_hashes?.[0]) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			const newStoreId = inserted_hashes?.[0]

			if (!newStoreId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			res.status(201).json({ message: `Store ${storeId} created successfully.` })

			return await harperdb.updateOne(
				{ id: user.id, usage: { ...(user.usage ?? {}), stores: (user.usage?.stores ?? 0) + 1 } },
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

export default withAuthentication(createStore as NextApiHandler)
