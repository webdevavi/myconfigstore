import React from "react"
import { PricingStatsContainer } from "../PricingStatsContainer"
import { Section } from "../Section"
import { SectionHeader } from "../SectionHeader"

export const PricingSection: React.FC = () => {
	return (
		<Section id="pricing">
			<SectionHeader>
				<span className="section__header">o</span>ur pricing
			</SectionHeader>
			<PricingStatsContainer />
		</Section>
	)
}
