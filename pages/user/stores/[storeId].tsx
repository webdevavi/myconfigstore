import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { Dashboard, FullStoreContainer, WithAuth, WithCurrentUser } from "../../../components"

const StorePage: NextPage = () => {
	const {
		query: { storeId },
	} = useRouter()

	return (
		<div>
			<Head>
				<title>{storeId} - Store | myconfig.store</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Dashboard>
				<FullStoreContainer storeId={storeId as string} />
			</Dashboard>
		</div>
	)
}

export default WithAuth(WithCurrentUser(StorePage), { redirect: "onUnauth" })
