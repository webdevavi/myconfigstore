import { NextPage } from "next"
import Head from "next/head"
import React from "react"
import { Dashboard, StoresContainer, WithAuth } from "../../../components"

const StoresPage: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Stores | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Dashboard>
				<StoresContainer />
			</Dashboard>
		</div>
	)
}

export default WithAuth(StoresPage, { redirect: "onUnauth" })
