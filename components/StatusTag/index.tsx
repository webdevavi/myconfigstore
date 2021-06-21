import { Tag, TagLabel, TagProps } from "@chakra-ui/react"
import React from "react"

interface StatusTagProps {
	isActive?: boolean
	activeColor?: string
	activeColorScheme?: TagProps["colorScheme"]
	inactiveColor?: string
	inactiveColorScheme?: TagProps["colorScheme"]
}

export const StatusTag: React.FC<StatusTagProps & TagProps> = ({
	isActive,
	activeColor,
	inactiveColor,
	activeColorScheme,
	inactiveColorScheme,
	children,
	...props
}) => (
	<Tag
		rounded="full"
		variant="subtle"
		colorScheme={isActive ? activeColorScheme ?? "green" : inactiveColorScheme ?? "red"}
		border="1.5px solid"
		borderColor={isActive ? activeColor ?? "brand.success" : inactiveColor ?? "brand.error"}
		{...props}
	>
		<TagLabel fontWeight="bold" color={isActive ? activeColor ?? "brand.success" : inactiveColor ?? "brand.error"}>
			{children ?? (isActive ? "Active" : "Inactive")}
		</TagLabel>
	</Tag>
)
