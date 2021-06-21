import { Avatar, Box, Container, Heading, HStack, useBreakpoint } from "@chakra-ui/react"
import { useDrawer } from "@lib/hooks/drawer"
import { AppUser } from "@models"
import React from "react"
import { DrawerToggleButton } from "../../DrawerToggleButton"
import { TextLogo } from "../../Logo"
import { BrandTag } from "../../Tag"
import { UserAvatarMenu } from "../../UserAvatarMenu"

interface DashboardNavbarProps {
	user?: AppUser
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ user }) => {
	const { isOpen } = useDrawer()

	const breakpoint = useBreakpoint() ?? ""

	return (
		<Box bg={isOpen ? "brand.dark" : "brand.dark2"} boxShadow={isOpen ? "none" : "2xl"} pos="sticky" top="0" zIndex="1399">
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
						{/base|sm/.test(breakpoint) ? (
							<DrawerToggleButton rounded="full">
								<Avatar src={user?.image ?? undefined} alt="display pic" />
							</DrawerToggleButton>
						) : (
							<UserAvatarMenu user={user} />
						)}
					</HStack>
				</HStack>
			</Container>
		</Box>
	)
}
