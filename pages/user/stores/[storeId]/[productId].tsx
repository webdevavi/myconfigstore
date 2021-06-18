import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { Dashboard, FullProductContainer, WithAuth, WithCurrentUser } from "../../../../components"

const ProductPage: NextPage = () => {
	const {
		query: { storeId, productId },
	} = useRouter()

	return (
		<div>
			<Head>
				<title>
					{storeId} / {productId} - Product | myconfig.store
				</title>
				<meta name="description" content="A simple, fast, secure and highly available remote store for all your dynamic configs." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Dashboard>
				<FullProductContainer storeId={storeId as string} productId={productId as string} />
			</Dashboard>
		</div>
	)
}

export default WithAuth(WithCurrentUser(ProductPage), { redirect: "onUnauth" })
