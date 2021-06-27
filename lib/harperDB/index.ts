import { HarperDB } from "harperdbjs"

export const harperdb = new HarperDB({
	url: process.env.DB_URL ?? "",
	token: process.env.DB_TOKEN,
})
