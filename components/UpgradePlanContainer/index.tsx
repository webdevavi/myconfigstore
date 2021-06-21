import {
	Button,
	Center,
	CircularProgress,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputRightAddon,
	Select,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react"
import { useApplyPromoCode, useCurrentUser } from "@hooks"
import { Plans } from "@lib/models"
import numeral from "numeral"
import React, { useState } from "react"
import { FaCreditCard } from "react-icons/fa"
import plans from "../../pricing.json"
import { Card } from "../Card"
import { HeadingWithIcon } from "../HeadingWithIcon"
import { PlaceOrderButton } from "./PlaceOrderButton"
import { PlanDetailsContainer } from "./PlanDetailsContainer"

export const UpgradePlanContainer: React.FC = () => {
	const { currentUser, isLoading, isError, error } = useCurrentUser()

	const upradablePlans = Object.values(plans).filter(
		(plan) =>
			currentUser?.currentPlan.bill !== null &&
			currentUser?.currentPlan.bill !== undefined &&
			plan.bill !== null &&
			(currentUser.hasPlanExpired ? plan.bill >= currentUser.currentPlan.bill : plan.bill > currentUser.currentPlan.bill)
	)

	const [selectedPlanLabel, setSelectedPlanLabel] = useState<string | undefined>()

	const selectedPlan = Object.values(plans).find((plan) => plan.label === selectedPlanLabel)

	const {
		applyPromoCode,
		arePromoCodesLoading,
		appliedPromoCode,
		isPromoCodesError,
		payableAmount,
		promoCodeApplyError,
		promoCodesError,
		promoCode,
		setPromoCode,
	} = useApplyPromoCode({ bill: selectedPlan?.bill })

	return (
		<VStack w="full" alignItems="flex-start">
			<HStack>
				<HeadingWithIcon icon={FaCreditCard}>Upgrade Plan</HeadingWithIcon>
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
					{currentUser.subscription.plan === Plans.Enterprise ? (
						<Card py="16" maxW="4xl" textAlign="center">
							You can&apos;t upgrade since you have the Enterprise plan.
						</Card>
					) : currentUser.subscription.plan === Plans.DeveloperAnnual ? (
						<Card py="16" maxW="4xl" textAlign="center">
							You can&apos;t upgrade to the Enterprise plan directly, please write an email to us explaining your requirements if you want to upgrade.
						</Card>
					) : upradablePlans?.length > 0 ? (
						<Card maxW="4xl" py="8">
							<VStack w="full" alignItems="flex-start" spacing="4">
								<HStack w="full" justify="space-between">
									<Heading fontSize={{ base: "2xl", md: "3xl" }} color="brand.orange">
										Pick Plan
									</Heading>
									<Select maxW="sm" size="lg" placeholder="Select plan" onChange={(e) => setSelectedPlanLabel(e.target.value)}>
										{upradablePlans.map((plan) => (
											<option key={plan.label} value={plan.label}>
												{plan.label}
											</option>
										))}
									</Select>
								</HStack>

								{selectedPlan ? (
									<VStack w="full" alignItems="flex-start">
										<Divider />
										<Heading fontSize="2xl" color="brand.orange">
											Plan Details
										</Heading>
										<PlanDetailsContainer selectedPlan={selectedPlan as any} />
										<Stack w="full" py="8" alignItems="flex-end" justifyContent="space-between" direction={{ base: "column", md: "row" }}>
											{arePromoCodesLoading ? (
												<Center flex={1} w="full">
													<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
												</Center>
											) : isPromoCodesError && promoCodesError ? (
												<VStack flex={1} w="full">
													<Heading fontSize="xl">Couldn&apos;t load promo codes, refresh to apply one.</Heading>
													<Text>{(promoCodesError as any).message}</Text>
												</VStack>
											) : (
												<VStack>
													<FormControl isInvalid={!!promoCodeApplyError}>
														<FormLabel>Have a promo code?</FormLabel>
														<InputGroup>
															<Input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
															<InputRightAddon px="0">
																<Button size="md" onClick={applyPromoCode}>
																	Apply
																</Button>
															</InputRightAddon>
														</InputGroup>
														{promoCodeApplyError && <FormErrorMessage>{promoCodeApplyError}</FormErrorMessage>}
														{appliedPromoCode && (
															<FormHelperText color="brand.success">
																Code <strong>{appliedPromoCode.toUpperCase()}</strong> applied!
															</FormHelperText>
														)}
													</FormControl>
												</VStack>
											)}
										</Stack>
										<PlaceOrderButton plan={selectedPlan.label as Plans} coupon={appliedPromoCode}>
											PAY {numeral(payableAmount).format("$0.00a").toUpperCase()}{" "}
										</PlaceOrderButton>
									</VStack>
								) : (
									"No plan selected"
								)}
							</VStack>
						</Card>
					) : (
						<Card py="16" maxW="4xl" textAlign="center">
							No plan to upgrade.
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
