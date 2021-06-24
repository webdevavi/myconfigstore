import { Box, Heading, Link, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

export const PricingContainer: React.FC = () => {
	return (
		<div>
			<VStack w="full" pt="8" pb="24">
				<Heading color="brand.orange" fontSize={{ base: "4xl", md: "6xl" }}>
					Our Pricing
				</Heading>
				<Text textAlign="center">There are 5 plan models for the usage of myconfig.store.</Text>
				<Box maxW="full" overflowX="auto" py="8">
					<Table size="lg">
						<Thead>
							<Tr>
								<Th>Features</Th>
								<Th>Trial</Th>
								<Th>Hobby</Th>
								<Th>Developer</Th>
								<Th>Developer Annual</Th>
								<Th>Enterprise</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>
									<Heading fontSize="lg">Stores</Heading>
								</Td>
								<Td>1</Td>
								<Td>10</Td>
								<Td>1K</Td>
								<Td>1K</Td>
								<Td>Unlimited</Td>
							</Tr>
							<Tr>
								<Td>
									<Heading fontSize="lg">Products</Heading>
								</Td>
								<Td>1</Td>
								<Td>2K</Td>
								<Td>200K</Td>
								<Td>200K</Td>
								<Td>Unlimited</Td>
							</Tr>
							<Tr>
								<Td>
									<Heading fontSize="lg">Fields</Heading>
								</Td>
								<Td>100</Td>
								<Td>10K</Td>
								<Td>1M</Td>
								<Td>1M</Td>
								<Td>Unlimited</Td>
							</Tr>
							<Tr>
								<Td>
									<Heading fontSize="lg">Rate Limit (req./min)</Heading>
								</Td>
								<Td>60</Td>
								<Td>1K</Td>
								<Td>10K</Td>
								<Td>10K</Td>
								<Td>Unlimited</Td>
							</Tr>
							<Tr>
								<Td>
									<Heading fontSize="lg">Support</Heading>
								</Td>
								<Td>No</Td>
								<Td>Yes</Td>
								<Td>Yes</Td>
								<Td>Yes</Td>
								<Td>Yes</Td>
							</Tr>
						</Tbody>
						<Tfoot>
							<Tr>
								<Th>Pricing</Th>
								<Th>Free for 14 days</Th>
								<Th>5 USD</Th>
								<Th>25 USD</Th>
								<Th>300 USD</Th>
								<Th>Contact Us</Th>
							</Tr>
						</Tfoot>
					</Table>
				</Box>
				<Text textAlign="center">
					Please see and understand our{" "}
					<NextLink href="/refund" passHref>
						<Link href="/refund">refund policy</Link>
					</NextLink>{" "}
					&{" "}
					<NextLink href="/refund#Cancellation%20Policy" passHref>
						<Link href="/refund#Cancellation%20Policy">cancellation policy</Link>
					</NextLink>{" "}
					before subscribing.
				</Text>
			</VStack>
		</div>
	)
}
