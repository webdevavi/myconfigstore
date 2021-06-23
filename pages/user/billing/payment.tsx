/* eslint-disable camelcase */

import { Dashboard, PaymentHistoryContainer, ProcessPaymentContainer, WithAuth, WithCurrentUser } from "@components"
import { NextPageWithSEO } from "@lib/types"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

const PaymentPage: NextPageWithSEO = () => {
	const { query } = useRouter()

	return (
		<div>
			<Head>
				<script type="text/javascript" src="/js/razorpay.js" />
			</Head>

			<Dashboard>
				{query?.pay && <ProcessPaymentContainer />}
				<PaymentHistoryContainer />
			</Dashboard>
		</div>
	)
}

PaymentPage.seo = {
	title: "Payments",
}

export default WithAuth(WithCurrentUser(PaymentPage), { redirect: "onUnauth" })
