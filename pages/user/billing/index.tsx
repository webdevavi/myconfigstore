import { CurrentPlanContainer, Dashboard, UpgradePlanContainer, WithAuth, WithCurrentUser } from "@components"
import { NextPage } from "next"
import Head from "next/head"
import React from "react"

const BillingPage: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Home | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Dashboard>
				<CurrentPlanContainer />
				<UpgradePlanContainer />
			</Dashboard>
		</div>
	)
}

export default WithAuth(WithCurrentUser(BillingPage), { redirect: "onUnauth" })
