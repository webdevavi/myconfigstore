import { StoreDataJSON } from "./storeData"

export interface IPromoCode {
	code: string
	discount: number
}

export type PromoCodeJSON = Omit<IPromoCode, "discount"> & { discount: string }

export class PromoCode implements IPromoCode {
	code: string

	discount: number

	constructor(data: IPromoCode) {
		const { code, discount } = data
		this.code = code
		this.discount = discount
	}

	static fromJSON(json: PromoCodeJSON): PromoCode {
		const { code, discount } = json

		return new PromoCode({
			code,
			discount: Number(discount),
		})
	}

	static fromStore(storeJSON: StoreDataJSON): PromoCode[] {
		const { data } = storeJSON

		const codes: PromoCodeJSON[] = Object.keys(data).map((code) => ({ code, discount: data[code] }))

		return codes.map((code) => PromoCode.fromJSON(code))
	}
}
