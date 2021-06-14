import { HStack } from "@chakra-ui/react"
import React, { useCallback } from "react"
import { NavLink } from "../NavLink"
import { useRouter } from "next/router"

export const NavLinks = () => {
	const { pathname } = useRouter()

	const isActive = useCallback((path: string) => new RegExp(`^${pathname}(\/|)$`).test(path), [pathname])

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
		</HStack>
	)
}
