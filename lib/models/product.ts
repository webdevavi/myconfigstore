import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { Field, IField } from "./field"

export interface IProduct {
	id?: string
	productId: string
	storeId: string
	ownerId: string
	url?: string
	isActive?: boolean
	isPrivate?: boolean
	isUsingStoreKey?: boolean
	productKey?: string
	fields?: IField[]
	createdAt?: string
	updatedAt?: string
}

export type ProductJSON = Omit<IProduct, "url" | "createdAt" | "updatedAt"> & { __createdtime__: string; __updatedtime__: string }

export class Product implements IProduct {
	id?: string | undefined
	productId: string
	storeId: string
	ownerId: string
	url?: string | undefined
	isActive?: boolean | undefined
	isPrivate?: boolean | undefined
	isUsingStoreKey?: boolean | undefined
	productKey?: string | undefined
	fields?: Field[] | undefined
	createdAt?: string | undefined
	updatedAt?: string | undefined

	constructor({ id, productId, storeId, ownerId, url, isActive, isPrivate, isUsingStoreKey, productKey, fields, createdAt, updatedAt }: IProduct) {
		this.id = id
		this.productId = productId
		this.storeId = storeId
		this.ownerId = ownerId
		this.url = url
		this.isActive = isActive
		this.isPrivate = isPrivate
		this.isUsingStoreKey = isUsingStoreKey
		this.productKey = productKey
		this.fields = fields?.map((field) => new Field(field)) ?? []
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	static fromJSON({
		id,
		productId,
		storeId,
		ownerId,
		isActive,
		isPrivate,
		isUsingStoreKey,
		productKey,
		fields,
		__createdtime__,
		__updatedtime__,
	}: ProductJSON) {
		return new Product({
			id,
			productId,
			storeId,
			ownerId,
			isActive,
			isPrivate,
			isUsingStoreKey,
			productKey,
			fields,
			createdAt: formatDistanceToNow(new Date(__createdtime__), { addSuffix: true }),
			updatedAt: formatDistanceToNow(new Date(__updatedtime__), { addSuffix: true }),
			url: `https://${storeId}.myconfig.store/api/v1/${productId}`,
		})
	}

	static fromJSONWithRawDates({
		id,
		productId,
		storeId,
		ownerId,
		isActive,
		isPrivate,
		isUsingStoreKey,
		productKey,
		fields,
		__createdtime__,
		__updatedtime__,
	}: ProductJSON) {
		return new Product({
			id,
			productId,
			storeId,
			ownerId,
			isActive,
			isPrivate,
			isUsingStoreKey,
			productKey,
			fields,
			createdAt: new Date(__createdtime__).toUTCString(),
			updatedAt: new Date(__updatedtime__).toUTCString(),
			url: `https://${storeId}.myconfig.store/api/v1/${productId}`,
		})
	}

	toObject({ encrypt }: { encrypt: boolean } = { encrypt: true }): IProduct {
		return {
			id: this.id,
			productId: this.productId,
			storeId: this.storeId,
			ownerId: this.ownerId,
			url: this.url,
			isActive: this.isActive,
			fields: encrypt ? this.fields?.map((field) => field.encrypted) : this.fields,
			isPrivate: this.isPrivate,
			isUsingStoreKey: this.isUsingStoreKey,
			productKey: this.productKey,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		}
	}

	toJSON() {
		const data: Record<string, string> = {}

		this.fields
			?.map((field) => field.decrypted)
			?.forEach((field) => {
				data[field.key] = field.value
			})

		return {
			productId: this.productId,
			storeId: this.storeId,
			url: this.url,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			data,
		}
	}
}
