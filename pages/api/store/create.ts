import { NextApiRequest, NextApiResponse } from "next"
import { User } from "next-auth"
import { getSession } from "next-auth/client"
import { HarperDB } from "../../../lib/harperDB"
import { Store } from "../../../lib/models"
import { FieldError } from "../../../lib/types"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const fieldErrors: FieldError[] = []
	if (req.method === "POST") {
		const session = await getSession({ req })

		console.log({ session })

		if (!session?.id || typeof session.id !== "string") {
			return res.status(403).json({ error: "You are not allowed to perform this action." })
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

		const store = new Store({ storeId: storeId!, ownerId: session.id })

		try {
			await db.insert({ table: "stores", records: [store] })
			return res.status(201).json({ message: `Store ${storeId} created successfully.` })
		} catch (err) {
			return res.status(500).json({ error: "Some unexpected error occurred." })
		}
	}
}
