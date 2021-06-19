import { ISubscription, Plans, Subscription, SubscriptionJSON } from "./subscription"
import { IUsage, Usage } from "./usage"
import pricing from "../../pricing.json"
import isBefore from "date-fns/isBefore"

export interface IAppUser {
	id: string
	name?: string
	email?: string
	isEmailVerified?: boolean
	image?: string
	subscription: ISubscription
	usage?: IUsage
}

export type AppUserJSON = Omit<IAppUser, "subscription"> & { subscription: SubscriptionJSON }

export class AppUser implements IAppUser {
	id: string
	name?: string | undefined
	email?: string | undefined
	isEmailVerified?: boolean | undefined
	image?: string | undefined
	subscription: Subscription
	usage?: Usage | undefined

	constructor(user: IAppUser) {
		const { id, name, email, isEmailVerified, image, subscription, usage } = user

		this.id = id
		this.name = name
		this.email = email
		this.isEmailVerified = isEmailVerified ?? false
		this.image = image
		this.subscription = new Subscription(subscription)
		this.usage = usage ? new Usage(usage) : undefined
	}

	static fromJSON(json: AppUserJSON): AppUser {
		const { subscription, ...rest } = json

		return new AppUser({ ...rest, subscription: Subscription.fromJSON(subscription) })
	}

	toJSON(): AppUserJSON {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			isEmailVerified: this.isEmailVerified,
			image: this.image,
			subscription: this.subscription.toJSON(),
			usage: this.usage,
		}
	}

	private calcPercent = (used: number | undefined | null, total: number | undefined | null) => {
		return ((used ?? 0) / (total ?? 1)) * 100
	}

	private calcAvailable = (used: number | undefined | null, total: number | undefined | null) => {
		return (used ?? 0) - (total ?? 0)
	}

	/**
	 * Available features for current subscription plan
	 */
	get features() {
		return pricing[Object.keys(pricing).find((key) => pricing[key as keyof typeof pricing].label === this.subscription.plan) as keyof typeof pricing]
			?.features
	}

	/**
	 * An average statistics summary of the app usage in percent.
	 */
	get usageSummary(): number {
		const { stores, products, fields } = this.detailedUsage.percent

		return ((stores ?? 0) + (products ?? 0) + (fields ?? 0)) / 3 ?? 0
	}

	/**
	 * Detailed statistics summary of the app usage - stores, products and fields.
	 */
	get detailedUsage(): {
		used?: IUsage
		total: IUsage
		available: IUsage
		percent: IUsage
	} {
		const empty = {
			fields: 0,
			products: 0,
			stores: 0,
		}

		if (this.subscription.plan === Plans.None || this.subscription.plan === Plans.Enterprise) {
			return {
				used: this.usage,
				total: empty,
				available: empty,
				percent: empty,
			}
		}

		return {
			used: this.usage,
			total: {
				fields: this.features.fields ?? 0,
				products: this.features.products ?? 0,
				stores: this.features.stores ?? 0,
			},
			available: {
				stores: this.calcAvailable(this.features?.stores, this.usage?.stores),
				products: this.calcAvailable(this.features?.products, this.usage?.products),
				fields: this.calcAvailable(this.features?.fields, this.usage?.fields),
			},
			percent: {
				stores: this.calcPercent(this.usage?.stores, this.features?.stores),
				products: this.calcPercent(this.usage?.products, this.features?.products),
				fields: this.calcPercent(this.usage?.fields, this.features?.fields),
			},
		}
	}

	get hasPlanExpired(): boolean {
		return isBefore(this.subscription.expiry, new Date())
	}

	/**
	 * Can this user can create more stores with the current subscription plan?
	 */
	get canCreateNewStore(): boolean {
		if (this.hasPlanExpired) {
			return false
		}

		if (this.subscription.plan === Plans.Enterprise) {
			return true
		}

		if (this.subscription.plan === Plans.None) {
			return false
		}

		const { stores } = this.features

		if (!stores || Number.isNaN(stores)) {
			return false
		}

		if (!((this.usage?.stores ?? 0) < stores)) {
			return false
		}

		return true
	}

	/**
	 * Can this user can create more products with the current subscription plan?
	 */
	get canCreateNewProduct(): boolean {
		if (this.hasPlanExpired) {
			return false
		}

		if (this.subscription.plan === Plans.Enterprise) {
			return true
		}

		if (this.subscription.plan === Plans.None) {
			return false
		}

		const { products } = this.features

		if (!products || Number.isNaN(products)) {
			return false
		}

		if (!((this.usage?.products ?? 0) < products)) {
			return false
		}

		return true
	}

	/**
	 * Can this user can create more fields with the current subscription plan?
	 */
	get canCreateNewField(): boolean {
		if (this.hasPlanExpired) {
			return false
		}

		if (this.subscription.plan === Plans.Enterprise) {
			return true
		}

		if (this.subscription.plan === Plans.None) {
			return false
		}

		const { fields } = this.features

		if (!fields || Number.isNaN(fields)) {
			return false
		}

		if (!((this.usage?.fields ?? 0) < fields)) {
			return false
		}

		return true
	}

	/**
	 * Can this user use the api endpoints?
	 */
	get canUseAPIEndpoints(): boolean {
		return !this.hasPlanExpired && this.subscription.plan !== Plans.None
	}
}
