import { Dashboard, DetailedUsageContainer, WithAuth, WithCurrentUser } from "@components"
import { NextPageWithSEO } from "@lib/types"
import React from "react"

const UsagePage: NextPageWithSEO = () => {
	return (
		<Dashboard>
			<DetailedUsageContainer />
		</Dashboard>
	)
}

UsagePage.seo = {
	title: "Usage",
	canonical: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/user/usage`,
}

export default WithAuth(WithCurrentUser(UsagePage), { redirect: "onUnauth" })
