import { Center, CircularProgress, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { FaChartBar } from "react-icons/fa"
import { Card, HeadingWithIcon } from ".."
import { useCurrentUser } from "../../lib/hooks/session"
import { BrandTag } from "../Tag"
import { UsageContainer } from "./UsageContainer"

const getPercentage = (value: number = 1, total: number = 1) => (value / total) * 100

export const DetailedUsageContainer: React.FC = () => {
	const { currentUser, isLoading, isError, error } = useCurrentUser()

	return (
		<VStack w="full" alignItems="flex-start" spacing="8">
			<HStack w="full" spacing={{ base: "2", md: "6" }}>
				<HeadingWithIcon fontSize={{ base: "xl", md: "2xl" }} icon={FaChartBar}>
					Detailed Usage
				</HeadingWithIcon>
				{currentUser && <BrandTag>{currentUser.subscription.plan}</BrandTag>}
			</HStack>
			{isLoading ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
				</Card>
			) : isError && error ? (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.error">
					{(error as any)?.message}
				</Card>
			) : currentUser ? (
				<VStack w="full" alignItems="flex-start" spacing="4">
					<Card maxW="4xl">
						<VStack w="full" alignItems="flex-start" spacing="4">
							<HeadingWithIcon fontSize="xl" icon={FaChartBar}>
								In Use
							</HeadingWithIcon>

							<UsageContainer
								label="Stores"
								value={currentUser.detailedUsage.percent.stores ?? 0}
								valueToShow={`${currentUser.detailedUsage.used?.stores ?? 0} / ${currentUser.detailedUsage.total.stores ?? 0}`}
							/>

							<UsageContainer
								label="Products"
								value={currentUser.detailedUsage.percent?.products ?? 0}
								valueToShow={`${currentUser.detailedUsage.used?.products ?? 0} / ${currentUser.detailedUsage.total?.products ?? 0}`}
							/>

							<UsageContainer
								label="Fields"
								value={currentUser.detailedUsage.percent.fields ?? 0}
								valueToShow={`${currentUser.detailedUsage.used?.fields ?? 0} / ${currentUser.detailedUsage.total.fields ?? 0}`}
							/>
						</VStack>
					</Card>
					<Card maxW="4xl">
						<VStack w="full" alignItems="flex-start" spacing="4">
							<HeadingWithIcon fontSize="xl" icon={FaChartBar}>
								Available
							</HeadingWithIcon>

							<UsageContainer
								label="Stores"
								value={getPercentage(currentUser.detailedUsage.available?.stores, currentUser.detailedUsage.total.stores)}
								valueToShow={`${currentUser.detailedUsage.available?.stores ?? 0} / ${currentUser.detailedUsage.total.stores ?? 0}`}
							/>

							<UsageContainer
								label="Products"
								value={getPercentage(currentUser.detailedUsage.available?.products, currentUser.detailedUsage.total.products)}
								valueToShow={`${currentUser.detailedUsage.available?.products ?? 0} / ${currentUser.detailedUsage.total?.products ?? 0}`}
							/>

							<UsageContainer
								label="Fields"
								value={getPercentage(currentUser.detailedUsage.available?.fields, currentUser.detailedUsage.total.fields)}
								valueToShow={`${currentUser.detailedUsage.available?.fields ?? 0} / ${currentUser.detailedUsage.total.fields ?? 0}`}
							/>
						</VStack>
					</Card>
				</VStack>
			) : (
				<Card as={Center} py="20" maxW="md" alignSelf="center" color="brand.light">
					You are not signed in.
				</Card>
			)}
		</VStack>
	)
}
