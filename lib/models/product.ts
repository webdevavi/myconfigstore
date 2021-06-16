import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { Field, IField } from "./field"

export interface IProduct {
	id?: string
	productId: string
	storeId: string
	ownerId: string
	url?: string
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
	isPrivate?: boolean | undefined
	isUsingStoreKey?: boolean | undefined
	productKey?: string | undefined
	fields?: Field[] | undefined
	createdAt?: string | undefined
	updatedAt?: string | undefined

	constructor({ id, productId, storeId, ownerId, url, isPrivate, isUsingStoreKey, productKey, fields, createdAt, updatedAt }: IProduct) {
		this.id = id
		this.productId = productId
		this.storeId = storeId
		this.ownerId = ownerId
		this.url = url
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
			isPrivate,
			isUsingStoreKey,
			productKey,
			fields,
			createdAt: formatDistanceToNow(new Date(__createdtime__), { addSuffix: true }),
			updatedAt: formatDistanceToNow(new Date(__updatedtime__), { addSuffix: true }),
			url: `https://${storeId}.myconfig.store/api/${productId}`,
		})
	}

	toObject(): IProduct {
		return {
			id: this.id,
			productId: this.productId,
			storeId: this.storeId,
			ownerId: this.ownerId,
			url: this.url,
			fields: this.fields,
			isPrivate: this.isPrivate,
			isUsingStoreKey: this.isUsingStoreKey,
			productKey: this.productKey,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		}
	}
}
