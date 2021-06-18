import {
	Avatar,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
	useBreakpoint,
	useDisclosure,
} from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import { AppUser } from "../../lib/models"

interface UserAvatarMenuProps {
	user: AppUser | undefined
}

export const UserAvatarMenu: React.FC<UserAvatarMenuProps> = ({ user }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const breakpoint = useBreakpoint() ?? ""

	return (
		<Menu isLazy lazyBehavior="unmount" preventOverflow autoSelect={false} onOpen={onOpen} onClose={onClose}>
			<MenuButton as={IconButton} rounded="full">
				<Avatar src={user?.image ?? undefined} alt="display pic" />
			</MenuButton>
			{isOpen && (
				<MenuList bg="brand.dark2">
					{/base/.test(breakpoint) && (
						<>
							<MenuGroup>
								<NextLink href="/user/stores" passHref>
									<MenuItem
										as={Link}
										fontFamily="Muli"
										fontWeight="black"
										color="brand.light"
										_focus={{ boxShadow: "none", outlineColor: "brand.orange", textDecor: "none" }}
									>
										Stores
									</MenuItem>
								</NextLink>
								<NextLink href="/user/billing" passHref>
									<MenuItem
										as={Link}
										fontFamily="Muli"
										fontWeight="black"
										color="brand.light"
										_focus={{ boxShadow: "none", outlineColor: "brand.orange", textDecor: "none" }}
									>
										Billing
									</MenuItem>
								</NextLink>

								<NextLink href="/docs" passHref>
									<MenuItem
										as={Link}
										fontFamily="Muli"
										fontWeight="black"
										color="brand.light"
										_focus={{ boxShadow: "none", outlineColor: "brand.orange", textDecor: "none" }}
									>
										Docs
									</MenuItem>
								</NextLink>
							</MenuGroup>

							<MenuDivider />
						</>
					)}

					<MenuGroup>
						{/base|sm|md/.test(breakpoint) && (
							<NextLink href="/user/usage" passHref>
								<MenuItem
									as={Link}
									fontFamily="Muli"
									fontWeight="black"
									color="brand.light"
									_focus={{ boxShadow: "none", outlineColor: "brand.orange", textDecor: "none" }}
								>
									Usage
								</MenuItem>
							</NextLink>
						)}
						<NextLink href="/user/account" passHref>
							<MenuItem
								as={Link}
								fontFamily="Muli"
								fontWeight="black"
								color="brand.light"
								_focus={{ boxShadow: "none", outlineColor: "brand.orange", textDecor: "none" }}
							>
								Account
							</MenuItem>
						</NextLink>
						<NextLink href="/auth/signout" passHref>
							<MenuItem
								as={Link}
								fontFamily="Muli"
								fontWeight="black"
								color="brand.light"
								_focus={{ boxShadow: "none", outlineColor: "brand.orange", textDecor: "none" }}
							>
								Sign out
							</MenuItem>
						</NextLink>
					</MenuGroup>
				</MenuList>
			)}
		</Menu>
	)
}
