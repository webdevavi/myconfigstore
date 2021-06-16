import formatDistanceToNow from "date-fns/formatDistanceToNow"

export interface IStore {
	id?: string
	ownerId: string
	storeId: string
	url?: string
	products?: number
	isActive?: boolean
	createdAt?: string
	updatedAt?: string
}

export type StoreJSON = Omit<IStore, "url" | "createdAt" | "updatedAt"> & { __createdtime__: string; __updatedtime__: string }

export class Store implements IStore {
	id?: string | undefined
	ownerId: string
	storeId: string
	url?: string | undefined
	products?: number | undefined
	isActive?: boolean | undefined
	createdAt?: string | undefined
	updatedAt?: string | undefined

	constructor({ id, ownerId, storeId, url, products, isActive, createdAt, updatedAt }: IStore) {
		this.id = id
		this.ownerId = ownerId
		this.storeId = storeId
		this.url = url
		this.products = products ?? 0
		this.isActive = isActive
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	static fromJSON({ id, storeId, ownerId, products, isActive, __createdtime__, __updatedtime__ }: StoreJSON) {
		return new Store({
			id,
			storeId,
			ownerId,
			products,
			isActive,
			createdAt: formatDistanceToNow(new Date(__createdtime__), { addSuffix: true }),
			updatedAt: formatDistanceToNow(new Date(__updatedtime__), { addSuffix: true }),
			url: `https://${storeId}.myconfig.store/api`,
		})
	}
}
