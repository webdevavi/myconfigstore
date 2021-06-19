import { NextPage } from "next"
import Head from "next/head"
import React from "react"
import { Dashboard, DetailedUsageContainer, WithAuth, WithCurrentUser } from "@components"

const UsagePage: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Home | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Dashboard>
				<DetailedUsageContainer />
			</Dashboard>
		</div>
	)
}

export default WithAuth(WithCurrentUser(UsagePage), { redirect: "onUnauth" })
