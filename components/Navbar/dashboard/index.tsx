import { Box, Container, Heading, HStack } from "@chakra-ui/react"
import React from "react"
import { AppUser } from "../../../lib/models"
import { TextLogo } from "../../Logo"
import { BrandTag } from "../../Tag"
import { UserAvatarMenu } from "../../UserAvatarMenu"

interface DashboardNavbarProps {
	user: AppUser | undefined
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ user }) => {
	return (
		<Box bg="brand.dark2" boxShadow="2xl" pos="sticky" top="0" zIndex="1399">
			<Container maxW="container.xl" py="2">
				<HStack justifyContent="space-between">
					<TextLogo zIndex="2" />
					<HStack spacing="6">
						{user?.subscription?.plan && (
							<Box d={{ base: "none", md: "block" }}>
								<BrandTag>{user.subscription.plan}</BrandTag>
							</Box>
						)}
						<Heading fontSize="lg" fontWeight="black" color="brand.orange" opacity="0.8" d={{ base: "none", md: "block" }}>
							{user?.name}
						</Heading>
						<UserAvatarMenu user={user} />
					</HStack>
				</HStack>
			</Container>
		</Box>
	)
}
