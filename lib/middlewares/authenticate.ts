import { NextApiRequest, NextApiResponse } from "next"
import { use, NextMiddleware } from "next-api-middleware"
import { Session } from "next-auth"
import { getSession } from "next-auth/client"

export type NextApiRequestWithAuth = NextApiRequest & {
	session: Session
}

const authenticate = async (req: NextApiRequestWithAuth, res: NextApiResponse, next: () => Promise<void>) => {
	const session = await getSession({ req })

	if (!session?.id || typeof session.id !== "string") {
		return res.status(403).json({ error: "You are not allowed to perform this action." })
	}

	req.session = session

	return await next()
}

export const withAuthentication = use(authenticate as NextMiddleware)
