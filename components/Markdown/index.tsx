import { Heading, HStack, Icon, Link, Text } from "@chakra-ui/react"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import NextLink from "next/link"
import React, { useState } from "react"
import { FaLink } from "react-icons/fa"
import ReactMarkdown from "react-markdown"
import slugify from "slugify"

export const Markdown = ({ children }: { children: string }) => <ReactMarkdown components={ChakraUIRenderer(newTheme)}>{children}</ReactMarkdown>

const newTheme = {
	h1: (props: any) => {
		const { children } = props

		const [hovered, setHovered] = React.useState(false)

		const slug = `${slugify(String(children), { lower: true })}`
		const slugUrl = `#${slug}`

		return (
			<NextLink href={slugUrl} passHref>
				<Link href={slugUrl} as={HStack} onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)} mb="2" mt="8">
					<Heading id={slug} as="h1" fontSize="4xl" mb="0">
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

		const slug = `${slugify(String(children), { lower: true })}`
		const slugUrl = `#${slug}`

		return (
			<NextLink href={slugUrl} passHref>
				<Link href={slugUrl} as={HStack} onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)} mb="2" mt="8">
					<Heading id={slug} as="h2" fontSize="3xl" mb="0">
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

		const slug = `${slugify(String(children), { lower: true })}`
		const slugUrl = `#${slug}`

		return (
			<NextLink href={slugUrl} passHref>
				<Link href={slugUrl} as={HStack} onMouseEnter={() => setHovered(true)} onMouseOut={() => setHovered(false)} mb="2" mt="8">
					<Heading id={slug} as="h3" fontSize="2xl" mb="0">
						{children}
					</Heading>
					<Icon as={FaLink} fontSize="lg" transition="visibility 100ms ease-in" visibility={hovered ? "visible" : "hidden"} />
				</Link>
			</NextLink>
		)
	},
	p: (props: any) => {
		const { children } = props

		return (
			<Text whiteSpace="pre-line" py="2">
				{children}
			</Text>
		)
	},
	a: (props: any) => {
		const { children, ...rest } = props

		return <Link {...rest}>{children}</Link>
	},
}
