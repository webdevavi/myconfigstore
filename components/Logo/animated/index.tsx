import { Heading, HeadingProps, Text } from "@chakra-ui/react"
import { motion, MotionProps } from "framer-motion"
import React from "react"

export type AnimatedHeadingProps = Omit<HeadingProps, "transition"> & MotionProps

const MotionHeading = motion<AnimatedHeadingProps>(Heading as any)

export const AnimatedLogo: React.FC<AnimatedHeadingProps> = (props) => (
	<MotionHeading
		fontSize={{ base: "5xl", md: "6xl" }}
		textAlign={{ base: "center", md: "left" }}
		zIndex="4"
		initial={{ opacity: 0, translateY: "50%" }}
		animate={{ opacity: 1, translateY: "0px" }}
		transition={{ duration: 0.5 }}
		{...props}
	>
		<Text as="span" color="brand.orangeDark">
			my
		</Text>
		<Text as="span" color="brand.orange">
			config
		</Text>
	</MotionHeading>
)
