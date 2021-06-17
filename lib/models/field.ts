export interface IField {
	key: string
	value: string
	isEncrypted?: boolean
}

export class Field implements IField {
	key: string
	value: string
	isEncrypted?: boolean | undefined

	constructor({ key, value, isEncrypted }: IField) {
		this.key = key
		this.value = value
		this.isEncrypted = Boolean(isEncrypted)
	}

	get encrypted(): Field {
		return new Field({
			...this,
			value: this.isEncrypted ? Array(20).fill("*").join("") : this.value,
		})
	}
}
