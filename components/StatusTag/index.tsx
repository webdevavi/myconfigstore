import { Tag, TagLabel } from "@chakra-ui/react"
import React from "react"

interface StatusTagProps {
	isActive?: boolean
}

export const StatusTag: React.FC<StatusTagProps> = ({ isActive }) => (
	<Tag
		rounded="full"
		variant="subtle"
		colorScheme={isActive ? "green" : "red"}
		border="1.5px solid"
		borderColor={isActive ? "brand.success" : "brand.error"}
	>
		<TagLabel fontWeight="bold" color={isActive ? "brand.success" : "brand.error"}>
			{isActive ? "Active" : "Inactive"}
		</TagLabel>
	</Tag>
)
