import { NextApiRequest, NextApiResponse } from "next"
import { NextMiddleware, use } from "next-api-middleware"
import { Session } from "next-auth"
import { getSession } from "next-auth/client"
import { harperdb } from "../harperDB"
import { AppUser, AppUserJSON } from "../models"

export type NextApiRequestWithAuth = NextApiRequest & {
	session: Session
	user: AppUser
}

const authenticate = async (req: NextApiRequestWithAuth, res: NextApiResponse, next: () => Promise<void>) => {
	const session = await getSession({ req })

	if (!session?.id || typeof session.id !== "string") {
		return res.status(403).json({ message: "You are not allowed to perform this action." })
	}

	const {
		records: [user],
	} = (await harperdb.searchByHash([session.id], { schema: "dev", table: "users" })) as unknown as { records: AppUserJSON[] }

	if (!user) {
		return res.status(403).json({ message: "You are not allowed to perform this action." })
	}

	req.session = session
	req.user = AppUser.fromJSON(user)

	return next()
}

export const withAuthentication = use(authenticate as NextMiddleware)
