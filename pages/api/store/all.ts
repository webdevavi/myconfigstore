import orderBy from "lodash/orderBy"
import { NextApiHandler, NextApiResponse } from "next"
import { harperdb } from "@lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "@lib/middlewares"
import { Store, StoreJSON } from "@models"

const getAllStores = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	if (req.method === "GET") {
		try {
			const { records: stores } = (await harperdb.searchByValue("ownerId", req.session.id as string, {
				schema: "dev",
				table: "stores",
			})) as unknown as { records: StoreJSON[] }

			return res.status(200).json(orderBy(stores, ["__updatedtime__"], ["desc"]).map((store) => Store.fromJSON(store)))
		} catch (err) {
			return res.status(500).json({ message: "Some unexpected error occurred." })
		}
	}

	return res.status(404).end()
}

export default withAuthentication(getAllStores as NextApiHandler)
