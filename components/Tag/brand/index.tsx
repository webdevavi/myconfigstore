import { Tag, TagLabel } from "@chakra-ui/react"
import React from "react"

export const BrandTag: React.FC<unknown> = ({ children }) => {
	return (
		<Tag rounded="full" size="lg" px="1.4em" bg="brand.orange" color="brand.dark">
			<TagLabel fontFamily="Muli" fontWeight="black">
				{children}
			</TagLabel>
		</Tag>
	)
}
