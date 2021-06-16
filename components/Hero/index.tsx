import { Box, BoxProps, Button, Container, Heading, HeadingProps, Text, TextProps, VStack } from "@chakra-ui/react"
import { motion, MotionProps } from "framer-motion"
import Lottie from "lottie-react"
import React from "react"
import heroAnimation from "../../lottie/hero.json"
import { AnimatedLogo } from "../Logo"

const MotionBox = motion<Omit<BoxProps, "transition"> & MotionProps>(Box as any)
const MotionHeading = motion<Omit<HeadingProps, "transition"> & MotionProps>(Heading as any)
const MotionText = motion<Omit<TextProps, "transition"> & MotionProps>(Text as any)

export const Hero: React.FC<unknown> = () => {
	return (
		<Container
			pos="relative"
			maxW="container.xl"
			as="section"
			d="flex"
			flexDir={{ base: "column", md: "row" }}
			justifyContent="space-between"
			py={{ base: "8", md: "16" }}
			minH="90vh"
			maxH="container.md"
		>
			<VStack pos="relative" align={{ base: "center", md: "flex-start" }} spacing={{ base: "8", md: "12" }}>
				<AnimatedLogo />
				<MotionHeading
					maxW="md"
					fontSize={{ base: "2xl", md: "3xl" }}
					color="brand.light"
					textAlign={{ base: "center", md: "left" }}
					zIndex="4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					A{" "}
					<MotionText
						as="span"
						color="brand.orange"
						initial={{ opacity: 0, translateY: "50%" }}
						animate={{ opacity: 1, translateY: "0px" }}
						transition={{ duration: 0.5, delay: 1 }}
					>
						simple
					</MotionText>
					,{" "}
					<MotionText
						as="span"
						color="brand.orange"
						initial={{ opacity: 0, translateY: "50%" }}
						animate={{ opacity: 1, translateY: "0px" }}
						transition={{ duration: 0.5, delay: 1.5 }}
					>
						fast
					</MotionText>
					,{" "}
					<MotionText
						as="span"
						color="brand.orange"
						initial={{ opacity: 0, translateY: "50%" }}
						animate={{ opacity: 1, translateY: "0px" }}
						transition={{ duration: 0.5, delay: 2 }}
					>
						{" "}
						secure
					</MotionText>{" "}
					and{" "}
					<MotionText
						as="span"
						color="brand.orange"
						initial={{ opacity: 0, translateY: "50%" }}
						animate={{ opacity: 1, translateY: "0px" }}
						transition={{ duration: 0.5, delay: 2.5 }}
					>
						highly available
					</MotionText>{" "}
					remote store for all your{" "}
					<MotionText
						as="span"
						color="brand.orange"
						initial={{ opacity: 0, translateY: "50%" }}
						animate={{ opacity: 1, translateY: "0px" }}
						transition={{ duration: 0.5, delay: 3 }}
					>
						{" "}
						dynamic configs
					</MotionText>
					.
				</MotionHeading>
				<MotionBox
					initial={{ opacity: 0, translateY: "50%" }}
					animate={{ opacity: 1, translateY: "0px" }}
					transition={{ duration: 0.5, delay: 3.5 }}
					zIndex="4"
				>
					<Button fontSize={{ base: "2xl", md: "3xl" }}>
						Try for free
						<Text as="span" fontSize="lg">
							*
						</Text>
					</Button>
					<MotionText
						fontSize="sm"
						fontWeight="bold"
						mt="1"
						color="brand.light"
						textAlign={{ base: "center", md: "left" }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						transition={{ duration: 0.5, delay: 4.5 }}
					>
						* Free trial for 14 days.
					</MotionText>
				</MotionBox>
				<MotionBox
					pos="absolute"
					top="2%"
					left={["30%", "25%", "2%"]}
					w={["36", "42", "48"]}
					h={["36", "42", "48"]}
					bg="brand.orange"
					rounded="full"
					filter="auto"
					blur="50px"
					zIndex="1"
					opacity="0.4"
					animate={{
						transform: "auto",
						translateX: "-50%",
						translateY: "24px",
					}}
					transition={{ ease: "easeOut", duration: 4, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
				/>
				<MotionBox
					pos="absolute"
					top="0"
					left="60%"
					w={["36", "48", "56"]}
					h={["36", "48", "56"]}
					bg="brand.orange"
					rounded="full"
					filter="auto"
					blur="50px"
					zIndex="1"
					opacity="0.4"
					animate={{
						transform: "auto",
						translateX: "-80%",
						translateY: "100px",
					}}
					transition={{
						ease: "easeOut",
						duration: 4,
						repeat: Infinity,
						repeatType: "reverse",
						repeatDelay: 1,
						delay: 3,
					}}
				/>
				<MotionBox
					pos="absolute"
					bottom="0"
					right="0"
					w={["48", "56", "64"]}
					h={["48", "56", "64"]}
					bg="brand.orangeDark"
					rounded="full"
					filter="auto"
					blur="50px"
					zIndex="1"
					opacity="0.4"
					animate={{
						transform: "auto",
						translateX: "-50%",
						translateY: "-100%",
						scale: 0.9,
					}}
					transition={{
						ease: "easeOut",
						duration: 4,
						repeat: Infinity,
						repeatType: "reverse",
						repeatDelay: 1,
						delay: 2,
					}}
				/>
			</VStack>
			<MotionBox
				pos="fixed"
				right="0"
				bottom={{ base: "0", md: "4%" }}
				transform="auto"
				translateX="30%"
				translateY={{ base: "50%", md: "0" }}
				w={{ base: "150vw", md: "75vw" }}
				h={{ base: "150vw", md: "75vw" }}
				bg="brand.orange"
				rounded="full"
				opacity="0.1"
				initial={{ filter: "blur(5px)" }}
				animate={{ filter: "blur(15px)" }}
				transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
			/>
			<MotionBox
				w={{ base: "auto", md: "50%" }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, ease: "easeIn", delay: 3.5 }}
			>
				<Box as={Lottie} animationData={heroAnimation} w="full" />
			</MotionBox>
		</Container>
	)
}
