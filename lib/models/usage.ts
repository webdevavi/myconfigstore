export interface IUsage {
	stores?: number
	products?: number
	fields?: number
}

export class Usage implements IUsage {
	stores?: number | undefined

	products?: number | undefined

	fields?: number | undefined

	constructor(usage: IUsage) {
		const { stores, products, fields } = usage

		this.stores = stores ?? 0
		this.products = products ?? 0
		this.fields = fields ?? 0
	}
}
