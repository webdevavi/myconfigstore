import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../../lib/middlewares"
import { StoreJSON } from "../../../../lib/models"

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
	const db = new HarperDB("dev")

	try {
		const [store] = await db.findByConditions<StoreJSON>(
			"and",
			[
				{ attribute: "ownerId", type: "equals", value: req.session.id as string },
				{ attribute: "storeId", type: "equals", value: storeId as string },
			],

			{ table: "stores" }
		)

		if (!store) {
			return res.status(404).json({ message: "No store exists with the provided store id." })
		}

		await db.update({ table: "stores", records: [{ id: store.id as string, isActive }] })
		return res.status(200).json({ message: `Store ${storeId} ${isActive ? "re-activated" : "deactivated"} successfully.` })
	} catch (err) {
		return res.status(500).json({ message: "Some unexpected error occurred." })
	}
}

export default withAuthentication(deactivateStore as NextApiHandler)
