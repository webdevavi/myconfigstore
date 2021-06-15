import { Box, Container, Heading, HStack } from "@chakra-ui/react"
import { User } from "next-auth"
import React from "react"
import { TextLogo } from "../../Logo"
import { BrandTag } from "../../Tag"
import { UserAvatarMenu } from "../../UserAvatarMenu"

interface DashboardNavbarProps {
	user: User | undefined
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ user }) => {
	return (
		<Box bg="brand.dark2" boxShadow="2xl">
			<Container as={HStack} maxW="container.xl" py="2" justifyContent="space-between">
				<TextLogo zIndex="2" />
				<HStack spacing="6" d={{ base: "none", md: "flex" }}>
					<BrandTag>FREE</BrandTag>
					<Heading fontSize="lg" fontWeight="black" color="brand.orange" opacity="0.8">
						{user?.name}
					</Heading>
					<UserAvatarMenu user={user} />
				</HStack>
			</Container>
		</Box>
	)
}
