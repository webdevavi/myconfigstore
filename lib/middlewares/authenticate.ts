import { NextApiRequest, NextApiResponse } from "next"
import { NextMiddleware, use } from "next-api-middleware"
import { Session } from "next-auth"
import { getSession } from "next-auth/client"
import { HarperDB } from "../harperDB"
import { AppUser, IAppUser } from "../models"

export type NextApiRequestWithAuth = NextApiRequest & {
	session: Session
	user: AppUser
}

const authenticate = async (req: NextApiRequestWithAuth, res: NextApiResponse, next: () => Promise<void>) => {
	const session = await getSession({ req })

	if (!session?.id || typeof session.id !== "string") {
		return res.status(403).json({ message: "You are not allowed to perform this action." })
	}

	const db = new HarperDB("dev")

	const [user] = await db.findByIds<IAppUser>([session.id], { table: "users" })

	if (!user) {
		return res.status(403).json({ message: "You are not allowed to perform this action." })
	}

	req.session = session
	req.user = new AppUser(user)

	return await next()
}

export const withAuthentication = use(authenticate as NextMiddleware)
