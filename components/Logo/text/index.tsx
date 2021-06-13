import { Heading, HeadingProps } from "@chakra-ui/react"
import React from "react"

export const TextLogo: React.FC<HeadingProps> = (props) => {
	return (
		<Heading as="span" fontWeight="black" color="brand.orange" fontSize="xl" {...props}>
			myconfig.store
		</Heading>
	)
}
