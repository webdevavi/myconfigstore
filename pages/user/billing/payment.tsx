/* eslint-disable camelcase */

import { Button } from "@chakra-ui/react"
import { Dashboard, WithAuth, WithCurrentUser } from "@components"
import { useCurrentUser } from "@lib/hooks"
import { Plans } from "@lib/models"
import axios from "axios"
import { NextPage } from "next"
import Head from "next/head"
import { IRazorOrderId } from "razorpay-typescript/dist/resources/order"
import React from "react"

const loadScript = (src: string) =>
	new Promise((resolve) => {
		const script = document.createElement("script")
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})

const PaymentPage: NextPage = () => {
	const { currentUser } = useCurrentUser()

	const displayRazorpay = async () => {
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

		if (!res) {
			alert("Razorpay SDK failed to load. Are you online?")
			return
		}

		const {
			data: { order },
		} = await axios.post<{ order: IRazorOrderId }>("/api/payment/razorpay/create-order", { plan: Plans.DeveloperAnnual })

		const options = {
			key: process.env.NEXT_PUBLIC_RZP_API_KEY,
			amount: order.amount,
			currency: "USD",
			name: "My Config Store",
			description: order.notes?.description,
			order_id: order.id,
			handler: async ({ razorpay_payment_id, razorpay_order_id, razorpay_signature }: any) => {
				await axios.post("/api/payment/razorpay/success", {
					plan: Plans.DeveloperAnnual,
					amount: order.amount,
					currency: "USD",
					orderId: order.id,
					razorpay_payment_id,
					razorpay_order_id,
					razorpay_signature,
				})
			},
			prefill: {
				name: currentUser?.name,
				email: currentUser?.email,
			},
			theme: {
				color: "#FF8303",
			},
		}

		// @ts-ignore
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		<div>
			<Head>
				<title>Payments | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Dashboard>
				<Button onClick={displayRazorpay}>PAY</Button>
			</Dashboard>
		</div>
	)
}

export default WithAuth(WithCurrentUser(PaymentPage), { redirect: "onUnauth" })
