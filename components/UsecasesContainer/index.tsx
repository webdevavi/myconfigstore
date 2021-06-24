import React from "react"
import { Grid } from "@chakra-ui/react"
import { UsecaseContainer } from "../UsecaseContainer"
import usecases from "../../usecases.json"

export const UsecasesContainer: React.FC = () => (
	<Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={24}>
		{usecases.map((usecase) => (
			<UsecaseContainer key={usecase.label} label={usecase.label}>
				{usecase.description}
			</UsecaseContainer>
		))}
	</Grid>
)
