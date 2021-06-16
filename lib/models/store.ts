export interface IStore {
	id?: string
	ownerId: string
	storeId: string
	url?: string
	products?: number
	createdAt?: Date
	updatedAt?: Date
}

export class Store implements IStore {
	id?: string | undefined
	ownerId: string
	storeId: string
	url?: string | undefined
	products?: number | undefined
	createdAt?: Date | undefined
	updatedAt?: Date | undefined

	constructor({ id, ownerId, storeId, url, products, createdAt, updatedAt }: IStore) {
		this.id = id
		this.ownerId = ownerId
		this.storeId = storeId
		this.url = url
		this.products = products ?? 0
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
