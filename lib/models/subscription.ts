export enum Plans {
	None = "NONE",
	Trial = "TRIAL",
	Hobby = "HOBBY",
	Developer = "DEV",
	DeveloperAnnual = "DEV ANNUAL",
	Enterprise = "ENTERPRISE",
}

export enum PaymentStatus {
	Paid = "PAID",
	Unpaid = "UNPAID",
}

export interface ISubscription {
	razorpayCustomerId?: string
	plan: Plans
	status: PaymentStatus
	expiry: Date
}

export type SubscriptionJSON = Omit<ISubscription, "expiry"> & { expiry: number }

export class Subscription implements ISubscription {
	razorpayCustomerId?: string | undefined

	plan: Plans

	status: PaymentStatus

	expiry: Date

	constructor(subscription: ISubscription) {
		const { razorpayCustomerId, plan, status, expiry } = subscription

		this.razorpayCustomerId = razorpayCustomerId
		this.plan = plan
		this.status = status
		this.expiry = expiry
	}

	static fromJSON(json: SubscriptionJSON): Subscription {
		const { expiry: expiryUNIX, ...rest } = json

		const expiry = new Date()
		expiry.setTime(expiryUNIX)

		return new Subscription({ ...rest, expiry })
	}

	toJSON(): SubscriptionJSON {
		return {
			razorpayCustomerId: this.razorpayCustomerId,
			plan: this.plan,
			status: this.status,
			expiry: this.expiry.getTime(),
		}
	}
}
