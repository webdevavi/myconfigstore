import { Heading, HStack, Icon, Link } from "@chakra-ui/react"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import NextLink from "next/link"
import React, { useState } from "react"
import { FaLink } from "react-icons/fa"
import ReactMarkdown from "react-markdown"

export const Markdown = ({ children }: { children: string }) => <ReactMarkdown components={ChakraUIRenderer(newTheme)}>{children}</ReactMarkdown>

const newTheme = {
	h1: (props: any) => {
		const { children } = props

		const [hovered, setHovered] = React.useState(false)

		return (
			<NextLink href={`#${encodeURIComponent(children)}`} passHref>
				<Link href={`#${encodeURIComponent(children)}`} as={HStack} onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
					<Heading id={encodeURIComponent(children)} as="h1" fontSize="4xl">
						{children}
					</Heading>
					<Icon as={FaLink} fontSize="2xl" transition="visibility 100ms ease-in" visibility={hovered ? "visible" : "hidden"} />
				</Link>
			</NextLink>
		)
	},
	h2: (props: any) => {
		const { children } = props

		const [hovered, setHovered] = useState(false)

		return (
			<NextLink href={`#${encodeURIComponent(children)}`} passHref>
				<Link
					href={`#${encodeURIComponent(children)}`}
					as={HStack}
					onMouseEnter={() => setHovered(true)}
					onMouseOut={() => setHovered(false)}
					alignItems="center"
				>
					<Heading id={encodeURIComponent(children)} as="h2" fontSize="3xl" mb="0">
						{children}
					</Heading>
					<Icon as={FaLink} fontSize="xl" transition="visibility 100ms ease-in" visibility={hovered ? "visible" : "hidden"} />
				</Link>
			</NextLink>
		)
	},
	h3: (props: any) => {
		const { children } = props

		const [hovered, setHovered] = useState(false)

		return (
			<NextLink href={`#${encodeURIComponent(children)}`} passHref>
				<Link href={`#${encodeURIComponent(children)}`} as={HStack} onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
					<Heading id={encodeURIComponent(children)} as="h3" fontSize="2xl">
						{children}
					</Heading>
					<Icon as={FaLink} fontSize="lg" transition="visibility 100ms ease-in" visibility={hovered ? "visible" : "hidden"} />
				</Link>
			</NextLink>
		)
	},
}
