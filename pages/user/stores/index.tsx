import { Dashboard, StoresContainer, WithAuth, WithCurrentUser } from "@components"
import { NextPageWithSEO } from "@lib/types"
import React from "react"

const StoresPage: NextPageWithSEO = () => {
	return (
		<Dashboard>
			<StoresContainer />
		</Dashboard>
	)
}

StoresPage.seo = { title: "Stores", canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/user/stores` }

export default WithAuth(WithCurrentUser(StoresPage), { redirect: "onUnauth" })
