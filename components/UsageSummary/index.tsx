import { Heading, Link, Progress, Text, VStack } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import NextLink from "next/link"
import React from "react"
import { useCurrentUser } from "../../lib/hooks/session"
import { Plans } from "../../lib/models"

export const UsageSummary: React.FC = () => {
	const { currentUser } = useCurrentUser()

	if (!currentUser) {
		return <></>
	}

	return (
		<>
			<VStack w="full" alignItems="stretch" py="8" px="2">
				<Heading textAlign="center" fontSize="lg" color="brand.orange">
					Usage Summary
				</Heading>
				{currentUser?.subscription.plan === Plans.None ? (
					<Text textAlign="center" color="brand.orange" fontSize="md">
						You don't have subscribed for any plan.
					</Text>
				) : currentUser.hasPlanExpired ? (
					<Text textAlign="center" color="brand.orange" fontSize="md">
						<Text as="span" textTransform="capitalize">
							{currentUser?.subscription.plan.toLowerCase()}
						</Text>{" "}
						{currentUser?.subscription.plan === Plans.Trial ? "" : "plan"} has expired,{" "}
						<NextLink href="/user/upgrade" passHref>
							<Link textAlign="center" color="brand.orange">
								Upgrade
							</Link>
						</NextLink>
						.
					</Text>
				) : (
					<Text textAlign="center" color="brand.orange" fontSize="md">
						<Text as="span" textTransform="capitalize">
							{currentUser?.subscription.plan.toLowerCase()}
						</Text>{" "}
						{currentUser?.subscription.plan === Plans.Trial ? "" : "plan"} expires in {formatDistanceToNow(currentUser?.subscription.expiry)}
					</Text>
				)}
				<Progress value={currentUser?.usageSummary} size="sm" />
				<NextLink href="/user/usage" passHref>
					<Link textAlign="center" color="brand.orange">
						See details
					</Link>
				</NextLink>
			</VStack>
		</>
	)
}
