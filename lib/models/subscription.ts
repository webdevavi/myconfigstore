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
	stripeCustomerId: string
	plan: Plans
	status: PaymentStatus
	expiry?: Date
}

export class Subscription implements ISubscription {
	stripeCustomerId: string
	plan: Plans
	status: PaymentStatus
	expiry?: Date | undefined

	constructor(subscription: ISubscription) {
		const { stripeCustomerId, plan, status, expiry } = subscription

		this.stripeCustomerId = stripeCustomerId
		this.plan = plan
		this.status = status
		this.expiry = expiry
	}
}
