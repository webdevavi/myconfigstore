import { Button, useToast } from "@chakra-ui/react"
import { useCreateOrderMutation } from "@lib/hooks"
import { Plans } from "@lib/models"
import { useRouter } from "next/router"
import React from "react"

interface PlaceOrderButtonProps {
	plan: Plans
	coupon?: string
}

export const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({ plan, coupon, children }) => {
	const { mutateAsync, isLoading } = useCreateOrderMutation()

	const toast = useToast()

	const router = useRouter()

	const placeOrder = async () => {
		try {
			const { status, data } = await mutateAsync({ plan, coupon })

			if (status === 201 && data.order) {
				return router.push(`/user/billing/payment?pay=${data.order.id}`)
			}

			return toast({
				title: "Place Order",
				description: "Some error occurred",
				status: "error",
			})
		} catch (err) {
			return toast({
				title: "Place Order",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Button fontSize={{ base: "xl", md: "2xl" }} w="full" onClick={placeOrder} isLoading={isLoading}>
			{children}
		</Button>
	)
}
