import { Box, Center, CircularProgress, Flex, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { Card, HeadingWithIcon } from "@components"
import { useGetAllPaymentsQuery } from "@lib/hooks"
import numeral from "numeral"
import React from "react"
import { FaCreditCard } from "react-icons/fa"

export const PaymentHistoryContainer = () => {
	const { data: payments, isLoading, isError, error } = useGetAllPaymentsQuery()

	return (
		<VStack w="full" alignItems="flex-start">
			<HeadingWithIcon icon={FaCreditCard}>Payment History</HeadingWithIcon>

			{isLoading ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
				</Card>
			) : isError && error ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.error">
					{(error as any)?.message}
				</Card>
			) : payments?.length && payments.length > 0 ? (
				<Flex w="full" direction={{ base: "column", sm: "row" }} flexWrap={{ sm: "wrap" }} py="4">
					<Card maxW="4xl">
						<Box w="full" maxW="full" overflowX="auto">
							<Table>
								<Thead>
									<Tr>
										<Th>Amount</Th>
										<Th>Plan</Th>
										<Th>Promo Code</Th>
										<Th>Discount</Th>
										<Th>Created</Th>
									</Tr>
								</Thead>
								<Tbody>
									{payments.map((payment) => (<Tr>
													<Td>
														{numeral(payment.amount / 100).format("0.00a")} {payment.currency}
													</Td>
													<Td>{payment.plan}</Td>
													<Td>{payment.couponUsed ?? "None"}</Td>
													<Td>{payment.discount ? `${numeral(payment.discount / 100).format("0.00a")} ${payment.currency}` : "None"}</Td>
													<Td>{payment.createdAt}</Td>
												</Tr>))}
								</Tbody>
							</Table>
						</Box>
					</Card>
				</Flex>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					No payment history to show
				</Card>
			)}
		</VStack>
	)
}
