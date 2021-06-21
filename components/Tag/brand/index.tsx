import { Tag, TagLabel, TagProps } from "@chakra-ui/react"
import React from "react"

export const BrandTag: React.FC<TagProps> = ({ children, ...props }) => {
	return (
		<Tag rounded="full" size="lg" px="1.4em" bg="brand.orange" color="brand.dark" {...props}>
			<TagLabel fontFamily="Muli" fontWeight="black">
				{children}
			</TagLabel>
		</Tag>
	)
}
