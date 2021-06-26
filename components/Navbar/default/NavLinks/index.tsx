import { HStack } from "@chakra-ui/react"
import React, { useCallback } from "react"
import { useRouter } from "next/router"
import { NavLink } from "../NavLink"

export const NavLinks = () => {
	const { pathname } = useRouter()

	const isActive = useCallback((path: string) => new RegExp(`^${pathname}(/|)$`).test(path), [pathname])

	return (
		<HStack spacing="6">
			<NavLink href="/" isActive={isActive("/")}>
				Home
			</NavLink>
			<NavLink href="/pricing" isActive={isActive("/pricing")}>
				Pricing
			</NavLink>
			<NavLink href="/docs" isActive={isActive("/docs")}>
				Docs
			</NavLink>
			<NavLink href="/contact" isActive={isActive("/contact")}>
				Contact
			</NavLink>
			<NavLink href="/auth/signin" isActive={isActive("/auth/signin")}>
				Sign in
			</NavLink>
		</HStack>
	)
}
