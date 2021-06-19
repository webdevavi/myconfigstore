import { stripe } from "./stripe"

/**
 * Creates a customer instance in Stripe for user
 *
 * @param name The name of the user to be added as Stripe customer
 * @param email The email of the user to be added as Stripe customer
 *
 * @returns The user's stripe customer id
 */
export const addStripeCustomer = async (name: string | undefined, email: string | undefined) => {
	const { id: stripeCustomerId } = await stripe.customers.create({ email, name })

	return stripeCustomerId
}

/**
 * Deletes a customer instance from Stripe
 *
 * @param stripeCustomerId The stripe customer id of the customer to be deleted
 * @returns True if deleted successfully
 */
export const deleteStripeCustomer = async (stripeCustomerId: string) => {
	const { deleted } = await stripe.customers.del(stripeCustomerId)

	return deleted
}
