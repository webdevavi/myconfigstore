import { CurrentPlanContainer, Dashboard, UpgradePlanContainer, WithAuth, WithCurrentUser } from "@components"
import { NextPageWithSEO } from "@lib/types"
import React from "react"

const BillingPage: NextPageWithSEO = () => {
	return (
		<Dashboard>
			<CurrentPlanContainer />
			<UpgradePlanContainer />
		</Dashboard>
	)
}

BillingPage.seo = {
	title: "Billing",
}

export default WithAuth(WithCurrentUser(BillingPage), { redirect: "onUnauth" })
