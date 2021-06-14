import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

export const BrandBlockButton: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<Button rounded="none" bg="brand.orange" _hover={{ bg: "brand.orangeDark", color: "brand.light" }} _focus={{ outline: "2px solid", outlineColor: "brand.orangeDark", border: "none", bg: "brand.orangeDark", color: "brand.light" }} color="brand.dark" fontFamily="Muli" fontWeight="black" fontSize="xl" px="2em" py="1.1em" {...props}>
			{children}
		</Button>
	)
}
