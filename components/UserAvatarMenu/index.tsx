import { Avatar, IconButton, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react"
import { AppUser } from "@models"
import NextLink from "next/link"
import React from "react"

interface UserAvatarMenuProps {
	user?: AppUser
}

export const UserAvatarMenu: React.FC<UserAvatarMenuProps> = ({ user }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Menu isLazy lazyBehavior="unmount" preventOverflow autoSelect={false} onOpen={onOpen} onClose={onClose}>
			<MenuButton as={IconButton} rounded="full">
				<Avatar src={user?.image ?? undefined} alt="display pic" />
			</MenuButton>
			{isOpen && (
				<MenuList bg="brand.dark2">
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

						<NextLink href="https://docs.myconfig.store" passHref>
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

					<MenuGroup>
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
