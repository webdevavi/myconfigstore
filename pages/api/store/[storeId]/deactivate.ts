import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { StoreJSON } from "@models"
import { NextApiHandler, NextApiResponse } from "next"

const deactivateStore = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "PUT") {
		return setStatus(false)(req, res)
	}
	if (req.method === "DELETE") {
		return setStatus(true)(req, res)
	}
	return res.status(404).end()
}

const setStatus = (isActive: boolean) => async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const { storeId } = req.query

	try {
		const {
			records: [store],
		} = (await harperdb.searchByConditions(
			[
				{ searchAttribute: "ownerId", searchType: "equals", searchValue: req.session.id as string },
				{ searchAttribute: "storeId", searchType: "equals", searchValue: storeId as string },
			],
			{ schema: "dev", table: "stores" }
		)) as unknown as { records: StoreJSON[] }

		if (!store) {
			return res.status(404).json({ message: "No store exists with the provided store id." })
		}

		await harperdb.updateOne({ id: store.id as string, isActive }, { schema: "dev", table: "stores" })
		return res.status(200).json({ message: `Store ${storeId} ${isActive ? "re-activated" : "deactivated"} successfully.` })
	} catch (err) {
		return res.status(500).json({ message: "Some unexpected error occurred." })
	}
}

export default withAuthentication(deactivateStore as NextApiHandler)
