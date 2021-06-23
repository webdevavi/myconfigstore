import { Dashboard, FullStoreContainer, WithAuth, WithCurrentUser } from "@components"
import { NextPageWithSEO } from "@lib/types"
import { NextSeo, NextSeoProps } from "next-seo"
import { useRouter } from "next/router"
import React from "react"

interface StorePageProps {
	seo: NextSeoProps
}

const StorePage: NextPageWithSEO<StorePageProps> = ({ seo }) => {
	const {
		query: { storeId },
	} = useRouter()

	return (
		<>
			<NextSeo {...seo} />
			<Dashboard>
				<FullStoreContainer storeId={storeId as string} />
			</Dashboard>
		</>
	)
}

StorePage.getInitialProps = async ({ query }) => {
	const { storeId } = query

	const seo: NextSeoProps = {
		title: `${storeId} - Store`,
		canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/user/stores/${storeId}`,
	}

	StorePage.seo = seo

	return { seo }
}

export default WithAuth(WithCurrentUser(StorePage), { redirect: "onUnauth" })
