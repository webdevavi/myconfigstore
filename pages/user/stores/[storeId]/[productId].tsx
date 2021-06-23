import { Dashboard, FullProductContainer, WithAuth, WithCurrentUser } from "@components"
import { NextPageWithSEO } from "@lib/types"
import { NextSeo, NextSeoProps } from "next-seo"
import { useRouter } from "next/router"
import React from "react"

interface ProductPageProps {
	seo: NextSeoProps
}

const ProductPage: NextPageWithSEO<ProductPageProps> = ({ seo }) => {
	const {
		query: { storeId, productId },
	} = useRouter()

	return (
		<>
			<NextSeo {...seo} />
			<Dashboard>
				<FullProductContainer storeId={storeId as string} productId={productId as string} />
			</Dashboard>
		</>
	)
}

ProductPage.getInitialProps = ({ query }) => {
	const { storeId, productId } = query

	const seo = {
		title: `${storeId} / ${productId} - Product`,
		canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/user/stores/${storeId}/${productId}`,
	}

	ProductPage.seo = seo

	return { seo }
}

export default WithAuth(WithCurrentUser(ProductPage), { redirect: "onUnauth" })
