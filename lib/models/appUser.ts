import { User } from "next-auth"

export class AppUser implements User {
	id: string
	name?: string | null
	email?: string | null
	image?: string | null;
	[x: string]: unknown

	constructor({ id, name, email, image }: User) {
		this.id = id as string
		this.name = name
		this.email = email
		this.image = image
	}
}
