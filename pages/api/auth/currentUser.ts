import { NextApiHandler, NextApiResponse } from "next"
import { HarperDB } from "../../../lib/harperDB"
import { NextApiRequestWithAuth, withAuthentication } from "../../../lib/middlewares"
import { IAppUser } from "../../../lib/models"

const getCurrentUser = async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
	const {
		session: { id },
	} = req

	if (req.method === "GET") {
		try {
			const db = new HarperDB("dev")

			const [user] = await db.findByIds<IAppUser>([id as string], { table: "users" })

			if (!user) {
				return res.status(404).json({ code: 404, message: "User doesn't exist" })
			}

			return res.status(200).json(user)
		} catch (err) {
			return res.status(505).json({ code: 500, message: "Internal Server Error" })
		}
	}
	return res.status(404).end()
}

export default withAuthentication(getCurrentUser as NextApiHandler)
