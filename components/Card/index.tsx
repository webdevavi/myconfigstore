import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react"
import React from "react"

export const Card: React.FC<BoxProps> = ({ children, ...props }) => {
	const styles = useStyleConfig("Card")

	return (
		<Box __css={styles} {...props}>
			{children}
		</Box>
	)
}
