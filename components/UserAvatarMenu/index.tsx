import { Avatar, IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { User } from "next-auth"
import React from "react"
import NextLink from "next/link"

interface UserAvatarMenuProps {
	user: User | undefined
}

export const UserAvatarMenu: React.FC<UserAvatarMenuProps> = ({ user }) => {
	return (
		<Menu isLazy>
			<MenuButton as={IconButton} rounded="full">
				<Avatar src={user?.image ?? undefined} alt="display pic" />
			</MenuButton>
			<MenuList bg="brand.dark2">
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
			</MenuList>
		</Menu>
	)
}
