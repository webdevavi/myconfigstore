import { Center, CircularProgress, Divider, Flex, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import { Card } from "@components"
import { useCurrentUser } from "@hooks"
import { Plans } from "@models"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import numeral from "numeral"
import React from "react"
import { FaMoneyBill } from "react-icons/fa"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { BrandTag } from "../Tag"

export const CurrentPlanContainer: React.FC = () => {
	const { currentUser, isLoading, isError, error } = useCurrentUser()

	return (
		<VStack w="full" alignItems="flex-start">
			<HStack>
				<HeadingWithIcon icon={FaMoneyBill}>Current Plan</HeadingWithIcon>
				{currentUser?.subscription.plan && (
					<BrandTag bg={currentUser.hasPlanExpired ? "brand.error" : "brand.orange"}>
						{currentUser.hasPlanExpired ? "EXPIRED" : currentUser.subscription.plan}
					</BrandTag>
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
			) : currentUser?.subscription.plan ? (
				<Flex w="full" direction={{ base: "column", sm: "row" }} flexWrap={{ sm: "wrap" }} py="4">
					{currentUser.subscription.plan === Plans.None ? (
						<Card py="16" maxW="4xl" textAlign="center">
							You have no current subscription.
						</Card>
					) : (
						<Card maxW="4xl" py="8">
							<VStack w="full" alignItems="flex-start">
								{currentUser.hasPlanExpired ? (
									<Text textAlign="center" color="brand.orange" fontSize="lg">
										<Text as="span" textTransform="capitalize">
											{currentUser?.subscription.plan.toLowerCase()}
										</Text>{" "}
										{currentUser?.subscription.plan === Plans.Trial ? "" : "plan"} has expired, Please upgrade.
									</Text>
								) : (
									<Text textAlign="center" color="brand.orange" fontSize="lg">
										<Text as="span" textTransform="capitalize">
											{currentUser?.subscription.plan.toLowerCase()}
										</Text>{" "}
										{currentUser?.subscription.plan === Plans.Trial ? "" : "plan"} expires in {formatDistanceToNow(currentUser?.subscription.expiry)}
									</Text>
								)}

								<Divider />

								<Heading fontSize="3xl" color="brand.orange">
									Features
								</Heading>

								<Stack w="full" direction={{ base: "column", md: "row" }} spacing="8">
									<VStack flex={1}>
										<Heading color="brand.orange" fontSize="2xl" opacity="0.75" textAlign="center" flex={1}>
											Stores
										</Heading>
										<Heading color="brand.orange" fontSize="3xl">
											{numeral(currentUser.features.stores).format("0a").toUpperCase()}
										</Heading>
									</VStack>
									<VStack flex={1}>
										<Heading color="brand.orange" fontSize="2xl" opacity="0.75" textAlign="center" flex={1}>
											Products
										</Heading>
										<Heading color="brand.orange" fontSize="3xl">
											{numeral(currentUser.features.products).format("0a").toUpperCase()}
										</Heading>
									</VStack>
									<VStack flex={1}>
										<Heading color="brand.orange" fontSize="2xl" opacity="0.75" textAlign="center" flex={1}>
											Fields
										</Heading>
										<Heading color="brand.orange" fontSize="3xl">
											{numeral(currentUser.features.fields).format("0a").toUpperCase()}
										</Heading>
									</VStack>
									<VStack flex={1}>
										<Heading color="brand.orange" fontSize="2xl" opacity="0.75" textAlign="center" flex={1}>
											Rate Limit <Text fontSize="md">(req./min)</Text>
										</Heading>
										<Heading color="brand.orange" fontSize="3xl">
											{numeral(currentUser.features.rateLimit).format("0a").toUpperCase()}
										</Heading>
									</VStack>
								</Stack>
							</VStack>
						</Card>
					)}
				</Flex>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You have no current subscription.
				</Card>
			)}
		</VStack>
	)
}
