import { Heading } from "@chakra-ui/react"
import React from "react"
import { useInView } from "react-intersection-observer"

export const SectionHeader: React.FC = ({ children }) => {
	const { inView, ref } = useInView({ threshold: 1, triggerOnce: true })

	return (
		<Heading
			ref={ref}
			textAlign="center"
			fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
			color="brand.orange"
			opacity={inView ? 1 : 0}
			transition="opacity 0.4s ease-in"
		>
			{children}
		</Heading>
	)
}
