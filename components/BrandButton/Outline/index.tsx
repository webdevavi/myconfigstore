import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

export const BrandOutlineButton: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<Button variant="outline" rounded="none" borderColor="brand.orange" _hover={{ bg: "brand.orangeDark", borderColor: "brand.orangeDark", color: "brand.light" }} _focus={{ bg: "brand.orangeDark", borderColor: "brand.orangeDark", color: "brand.light" }} color="brand.orange" fontFamily="Muli" fontWeight="black" fontSize="xl" px="2em" py="1.1em" {...props}>
			{children}
		</Button>
	)
}
