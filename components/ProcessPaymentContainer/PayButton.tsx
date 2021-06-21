/* eslint-disable camelcase */

import { Button, Center, CircularProgress, Text } from "@chakra-ui/react"
import { PaymentSuccessData, useCurrentUser, useHandlePaymentSuccessMutation } from "@hooks"
import { AppUser, Plans } from "@models"
import { colors } from "@theme"
import isNil from "lodash/isNil"
import omitBy from "lodash/omitBy"
import { useRouter } from "next/router"
import { IRazorOrderId } from "razorpay-typescript/dist/resources/order"
import React, { useState } from "react"

interface PayButtonProps {
	order: IRazorOrderId
}

export const PayButton: React.FC<PayButtonProps> = ({ order, children }) => {
	const { currentUser, isLoading, isError, error } = useCurrentUser()

	const { mutateAsync, isLoading: isSuccessHandlerLoading } = useHandlePaymentSuccessMutation()

	const [isProcessing, setIsProcessing] = useState(false)

	if (isLoading) {
		return (
			<Center my="4">
				<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
			</Center>
		)
	}

	if (isError && error) {
		return (
			<Text textAlign="center" my="4" color="brand.error">
				{(error as any)?.message}
			</Text>
		)
	}

	if (!currentUser) {
		return (
			<Text textAlign="center" my="4" color="brand.error">
				You are not allowed to proceed.
			</Text>
		)
	}

	const router = useRouter()

	const pay = async ({ notes, amount, currency, id }: IRazorOrderId, user: AppUser) => {
		if (notes?.user !== user.id) {
			/* eslint-disable-next-line no-alert */
			return alert("You are not allowed to make this payment.")
		}

		setIsProcessing(true)

		const prefill = omitBy(
			{
				name: user.name,
				email: user.email,
			},
			isNil
		)

		const readonly = omitBy(
			{
				name: "name" in prefill,
				email: "email" in prefill,
			},
			isNil
		)

		const handlePaymentSuccess = async ({ razorpay_payment_id, razorpay_order_id, razorpay_signature }: any) => {
			const data: PaymentSuccessData = {
				plan: notes?.plan as Plans,
				amount,
				currency,
				orderId: id,
				razorpayPaymentId: razorpay_payment_id,
				razorpayOrderId: razorpay_order_id,
				razorpaySignature: razorpay_signature,
				notes,
			}

			try {
				await mutateAsync({ data })
			} catch (err) {
				/* eslint-disable-next-line no-alert */
				alert(err.message)
			}

			setIsProcessing(false)
			router.replace("/user/billing")
		}

		const theme = {
			color: colors["brand.dark2"],
		}

		const options = {
			key: process.env.NEXT_PUBLIC_RZP_API_KEY,
			order_id: order.id,
			description: order.notes?.description,
			customer_id: order.notes?.customerId,
			amount: order.amount_due,
			currency: order.currency,
			name: "My Config Store",
			handler: handlePaymentSuccess,
			prefill,
			readonly,
			theme,
		}

		// @ts-ignore
		const rzrp = new window.Razorpay(options)

		if (rzrp) {
			rzrp.open()
			rzrp.on("payment.failed", (response: any) => {
				/* eslint-disable-next-line no-alert */
				alert(response.error.description)

				setIsProcessing(false)
				router.replace("/user/billing")
			})
		}

		return null
	}

	// @ts-ignore
	if (!window.Razorpay) {
		return (
			<Text textAlign="center" my="4">
				Couldn&apos;t load payment gateway integration, please refresh.
			</Text>
		)
	}

	return (
		<Button fontSize={{ base: "xl", md: "2xl" }} w="full" onClick={() => pay(order, currentUser)} isLoading={isSuccessHandlerLoading || isProcessing}>
			{children}
		</Button>
	)
}
