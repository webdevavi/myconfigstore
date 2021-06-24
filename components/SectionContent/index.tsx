import { Box, SlideFade } from "@chakra-ui/react"
import React from "react"
import { useInView } from "react-intersection-observer"

export const SectionContent: React.FC = ({ children }) => {
	const { inView, ref } = useInView({ threshold: 1, triggerOnce: true })

	return (
		<SlideFade transition={{ enter: { duration: 0.5 } }} in={inView}>
			<Box as="article" ref={ref}>
				{children}
			</Box>
		</SlideFade>
	)
}
