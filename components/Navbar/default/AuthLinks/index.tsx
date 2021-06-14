import { ButtonGroup } from "@chakra-ui/react"
import React from "react"
import { BrandBlockButton, BrandOutlineButton } from "../../../BrandButton"

export const AuthLinks: React.FC<unknown> = () => (
	<ButtonGroup>
		<BrandBlockButton fontSize="md" zIndex="4">
			Sign up
		</BrandBlockButton>
		<BrandOutlineButton fontSize="md" zIndex="4">
			Log in
		</BrandOutlineButton>
	</ButtonGroup>
)
