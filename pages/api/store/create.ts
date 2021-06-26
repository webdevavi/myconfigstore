import * as crypto from "crypto"
import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../lib/middlewares"
import { IAppUser, Store } from "../../../lib/models"
import { FieldError } from "../../../lib/types"

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

		const db = new HarperDB("dev")

		const stores = await db.findByValue("storeId", storeId!, { table: "stores" })

		if (stores && stores.length > 0) {
			fieldErrors.push({ field: "storeId", error: "This store id is not available." })
		}

		if (fieldErrors.length > 0) {
			return res.status(400).json({ fieldErrors })
		}

		const storeKey = crypto.randomBytes(64).toString("base64")

		const store = new Store({ storeId: storeId!, ownerId: user.id, storeKey, isActive: true })

		try {
			const [newStoreId] = await db.insert({ table: "stores", records: [store] })

			if (!newStoreId) {
				return res.status(500).json({ message: "Some unexpected error occurred." })
			}

			res.status(201).json({ message: `Store ${storeId} created successfully.` })

			return await db.update<IAppUser>({
				table: "users",
				records: [{ id: user.id, usage: { ...(user.usage ?? {}), stores: (user.usage?.stores ?? 0) + 1 } }],
			})
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}

	return res.status(404).end()
}

export default withAuthentication(createStore as NextApiHandler)
