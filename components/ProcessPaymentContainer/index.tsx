import { Center, CircularProgress, Flex, Heading, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { useGetOrderQuery } from "@lib/hooks"
import { format } from "date-fns"
import { useRouter } from "next/router"
import numeral from "numeral"
import React from "react"
import { FaCreditCard } from "react-icons/fa"
import { Card } from "../Card"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { StatusTag } from "../StatusTag"
import { PayButton } from "./PayButton"

export const ProcessPaymentContainer: React.FC = () => {
	const { query } = useRouter()

	const { data: order, isLoading, isError, error } = useGetOrderQuery({ orderId: query?.pay as string })

	const getTime = (unix: number) => {
		const date = new Date()
		date.setTime(unix * 1000)
		return format(date, "dd/MM/yyyy")
	}

	return (
		<VStack w="full" alignItems="flex-start">
			<HStack>
				<HeadingWithIcon icon={FaCreditCard}>Process Payment</HeadingWithIcon>
				{order && (
					<StatusTag inactiveColorScheme="orange" inactiveColor="brand.orange" isActive={order.status === "paid"}>
						{order.status?.toUpperCase()}
					</StatusTag>
				)}
			</HStack>

			{isLoading ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
				</Card>
			) : isError && error ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.error">
					{(error as any)?.message}
				</Card>
			) : order ? (
				<Flex w="full" direction={{ base: "column", sm: "row" }} flexWrap={{ sm: "wrap" }} py="4">
					<Card maxW="4xl">
						<VStack w="full" align="stretch" spacing="8">
							<VStack>
								<Heading color="brand.orange" fontSize="xl">
									Order Details - {order.notes?.description}
								</Heading>
								{order.notes?.couponUsed && order.notes?.discount && (
									<Text color="brand.success" fontSize="sm">
										Promo code <strong>{order.notes.couponUsed.toUpperCase()}</strong> applied for{" "}
										<strong>
											{numeral(Number(order.notes.discount) / 100).format("0.00a")} {order.currency}
										</strong>{" "}
										discount.
									</Text>
								)}
							</VStack>
							<Table>
								<Thead>
									<Tr>
										<Th>Amount</Th>
										<Th>Paid</Th>
										<Th>Due</Th>
										<Th>Created</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>
											{numeral(order.amount / 100).format("0.00a")} {order.currency}
										</Td>
										<Td>
											{numeral(order.amount_paid / 100).format("0.00a")} {order.currency}
										</Td>
										<Td>
											{numeral(order.amount_due / 100).format("0.00a")} {order.currency}
										</Td>
										<Td>{getTime(order.created_at)}</Td>
									</Tr>
								</Tbody>
							</Table>
							{order.amount_due && (
								<PayButton order={order}>
									Confirm & Pay {numeral(order.amount_due / 100).format("0.00a")} {order.currency}
								</PayButton>
							)}
						</VStack>
					</Card>
				</Flex>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					Could not find the order.
				</Card>
			)}
		</VStack>
	)
}
