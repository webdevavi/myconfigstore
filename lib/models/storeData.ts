export interface IStoreData<T extends Object> {
	productId: string
	storeId: string
	url: string
	createdAt: Date
	updatedAt: Date
	data: T
}

export type StoreDataJSON<T extends Object = object> = Omit<IStoreData<T>, "createdAt" | "updatedAt"> & {
	createdAt: string
	updatedAt: string
}

export class StoreData<T extends Object = object> implements IStoreData<T> {
	productId: string

	storeId: string

	url: string

	createdAt: Date

	updatedAt: Date

	data: T

	constructor(storeData: IStoreData<T>) {
		const { productId, storeId, url, createdAt, updatedAt, data } = storeData

		this.productId = productId
		this.storeId = storeId
		this.url = url
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.data = data
	}

	static fromJSON<T extends Object = Object>(json: StoreDataJSON<T>): StoreData<T> {
		const { createdAt, updatedAt, ...rest } = json

		return new StoreData<T>({
			...rest,
			createdAt: new Date(createdAt),
			updatedAt: new Date(updatedAt),
		})
	}
}
