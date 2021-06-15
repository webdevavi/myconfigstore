import { Box, BoxProps } from "@chakra-ui/react"
import React from "react"

export const BrandCard: React.FC<BoxProps> = ({ children, ...props }) => (
	<Box w="full" bg="brand.orangeLightest" p="4" maxW="2xl" borderWidth="2px" borderColor="brand.orangeLight" borderStyle="solid" {...props}>
		{children}
	</Box>
)
