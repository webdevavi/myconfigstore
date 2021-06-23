/* eslint-disable camelcase */

import { Dashboard, PaymentHistoryContainer, WithAuth, WithCurrentUser } from "@components"
import { loadDynamicComponent } from "@lib/utils"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

const ProcessPaymentContainer = loadDynamicComponent(() => import("@components").then((mod) => mod.ProcessPaymentContainer))

const PaymentPage: NextPage = () => {
	const { query } = useRouter()

	return (
		<div>
			<Head>
				<script type="text/javascript" src="/js/razorpay.js" />
				<title>Payments | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Dashboard>
				{query?.pay && <ProcessPaymentContainer />}
				<PaymentHistoryContainer />
			</Dashboard>
		</div>
	)
}

export default WithAuth(WithCurrentUser(PaymentPage), { redirect: "onUnauth" })
