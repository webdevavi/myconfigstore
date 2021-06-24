import { Box, Heading, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import { useInView } from "react-intersection-observer"

interface UsecaseContainerProps {
	label: string
}

export const UsecaseContainer: React.FC<UsecaseContainerProps> = ({ label, children }) => {
	const [isActive, setIsActive] = useState(false)
	const { ref, inView } = useInView({
		threshold: 1,
	})

	const isExpanded = useBreakpointValue({ base: isActive || inView, md: isActive })

	return (
		<VStack
			ref={ref}
			pos="relative"
			w="full"
			alignItems="flex-start"
			px={8}
			py={4}
			onMouseEnter={() => setIsActive(true)}
			onMouseLeave={() => setIsActive(false)}
			onFocus={() => setIsActive(true)}
			onBlur={() => setIsActive(false)}
		>
			<Box
				pos="absolute"
				top={isExpanded ? { base: -2, md: -6 } : { base: 0, md: -2 }}
				left={isExpanded ? { base: -4, md: -8 } : { base: -2, md: -4 }}
				w={{ base: 36, md: 48 }}
				h={{ base: 36, md: 48 }}
				bgImage={`radial-gradient(${isExpanded ? "#98541A" : "#392C1D"} 30%, transparent 30%)`}
				bgPos="0 0"
				bgSize={{ base: "12px 12px", md: "16px 16px" }}
				transition="all 0.2s ease-in-out"
			/>
			<Box
				pos="absolute"
				top={{ base: 2, md: 0 }}
				left={{ base: 2, md: 0 }}
				w={isExpanded ? "calc(100% - 8px)" : { base: 36, md: 48 }}
				h={isExpanded ? "calc(100% - 8px)" : { base: 36, md: 48 }}
				bg="brand.orangeDarker"
				boxShadow={isExpanded ? "dark-lg" : "md"}
				transition="all 0.2s ease-in-out"
			/>
			<Heading
				textTransform="capitalize"
				color="brand.orange"
				bgImage=" linear-gradient(to right, transparent, transparent), linear-gradient(to right, hsl(172.96, 100%, 45.1%) 0%, hsl(173.31, 100%, 44.88%) 8.1%, hsl(174.32, 100%, 44.27%) 15.5%, hsl(175.96, 100%, 43.3%) 22.5%, hsl(178.22, 100%, 42.03%) 29%, hsl(181.11, 100%, 41.24%) 35.3%, hsl(184.39, 100%, 41.74%) 41.2%, hsl(187.9, 100%, 42.27%) 47.1%, hsl(191.54, 100%, 42.8%) 52.9%, hsl(195.21, 100%, 43.31%) 58.8%, hsl(198.8, 100%, 43.79%) 64.7%, hsl(202.2, 100%, 44.22%) 71%, hsl(205.24, 100%, 44.58%) 77.5%, hsl(207.71, 100%, 44.86%) 84.5%, hsl(209.39, 100%, 45.03%) 91.9%, hsl(210, 100%, 45.1%) 100%)"
				bgSize={isExpanded ? "0 0.1em, 100% 0.1em" : "100% 0.1em, 0 0.1em"}
				bgPos="100% 100%, 0 100%"
				bgRepeat="no-repeat"
				transition="background-size 0.2s ease-in-out"
				zIndex={2}
			>
				{label}
			</Heading>
			<Text fontSize={{ md: "xl" }} fontWeight="bold" opacity={isExpanded ? 1 : 0.6} transition="opacity 0.2s ease-in-out" zIndex={2}>
				{children}
			</Text>
		</VStack>
	)
}
