import { Link, LinkProps } from "@chakra-ui/react"
import NextLink from "next/link"

interface NavLinkProps {
	href: string
	isActive?: boolean
}

export const NavLink: React.FC<NavLinkProps & LinkProps> = ({ children, href, isActive = false, ...props }) => {
	return (
		<NextLink href={href} passHref>
			<Link
				fontWeight="bold"
				color="brand.orange"
				opacity={isActive ? 1 : 0.5}
				textDecor={isActive ? "underline" : "none"}
				textUnderlineOffset="0.2rem"
				p="1"
				_hover={{
					opacity: 1,
					textDecor: "underline",
				}}
				_focus={{
					opacity: 1,
					textDecor: "underline",
					outline: "1px solid currentcolor",
				}}
				{...props}
			>
				{children}
			</Link>
		</NextLink>
	)
}
