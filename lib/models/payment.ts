import format from "date-fns/format"
import { Plans } from "./subscription"

export interface IPayment {
	id: string | number
	userId: string | number
	plan: Plans
	amount: number
	currency: string
	couponUsed?: string
	discount?: number
	razorpayOrderId: string | number
	razorpayPaymentId: string | number
	createdAt?: string
	updatedAt?: string
}

export type PaymentJSON = Omit<IPayment, "createdAt" | "updatedAt"> & { __createdtime__: string; __updatedtime__: string }

export class Payment implements IPayment {
	id: string | number

	userId: string | number

	plan: Plans

	amount: number

	currency: string

	couponUsed?: string | undefined

	discount?: number | undefined

	razorpayOrderId: string | number

	razorpayPaymentId: string | number

	createdAt?: string | undefined

	updatedAt?: string | undefined

	constructor({ id, userId, plan, amount, currency, couponUsed, discount, razorpayOrderId, razorpayPaymentId, createdAt, updatedAt }: IPayment) {
		this.id = id
		this.userId = userId
		this.plan = plan
		this.amount = amount
		this.currency = currency
		this.couponUsed = couponUsed
		this.discount = discount
		this.razorpayOrderId = razorpayOrderId
		this.razorpayPaymentId = razorpayPaymentId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	static fromJSON({
		id,
		userId,
		plan,
		amount,
		currency,
		couponUsed,
		discount,
		razorpayOrderId,
		razorpayPaymentId,
		__createdtime__,
		__updatedtime__,
	}: PaymentJSON) {
		return new Payment({
			id,
			userId,
			plan,
			amount,
			currency,
			couponUsed,
			discount,
			razorpayOrderId,
			razorpayPaymentId,
			createdAt: format(new Date(__createdtime__), "dd/MM/yyyy"),
			updatedAt: format(new Date(__updatedtime__), "dd/MM/yyyy"),
		})
	}

	static fromJSONWithRawDates({
		id,
		userId,
		plan,
		amount,
		currency,
		couponUsed,
		discount,
		razorpayOrderId,
		razorpayPaymentId,
		__createdtime__,
		__updatedtime__,
	}: PaymentJSON) {
		return new Payment({
			id,
			userId,
			plan,
			amount,
			currency,
			couponUsed,
			discount,
			razorpayOrderId,
			razorpayPaymentId,
			createdAt: new Date(__createdtime__).toUTCString(),
			updatedAt: new Date(__updatedtime__).toUTCString(),
		})
	}

	toJSON(): IPayment {
		return {
			id: this.id,
			userId: this.userId,
			plan: this.plan,
			amount: this.amount,
			currency: this.currency,
			couponUsed: this.couponUsed,
			discount: this.discount,
			razorpayOrderId: this.razorpayOrderId,
			razorpayPaymentId: this.razorpayPaymentId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		}
	}
}
