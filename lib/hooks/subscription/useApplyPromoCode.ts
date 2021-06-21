import { useEffect, useState } from "react"
import { useGetPromoCodesQuery } from "./useGetPromoCodesQuery"

export const useApplyPromoCode = ({ bill }: { bill?: number | null }) => {
	const { data: promoCodes, isLoading: arePromoCodesLoading, isError: isPromoCodesError, error: promoCodesError } = useGetPromoCodesQuery()
	const [promoCodeApplyError, setPromoCodeApplyError] = useState<string | undefined>()
	const [promoCode, setPromoCode] = useState("")
	const [payableAmount, setPayableAmount] = useState(bill ?? 0)
	const [appliedPromoCode, setAppliedPromoCode] = useState("")

	useEffect(() => {
		if (!bill || Number.isNaN(bill)) {
			return
		}

		if (bill === payableAmount) {
			return
		}

		setPromoCode("")
		setAppliedPromoCode("")
		setPayableAmount(bill)
	}, [bill, promoCode])

	const applyPromoCode = () => {
		if (!bill || Number.isNaN(bill)) {
			return setPromoCodeApplyError("Invalid amount.")
		}

		const validPromoCode = promoCodes?.find(({ code }) => code.toLowerCase() === promoCode.toLowerCase())

		if (!validPromoCode) {
			return setPromoCodeApplyError("Invalid promo code.")
		}

		const payable = bill - (validPromoCode.discount / 100) * bill

		setPromoCodeApplyError(undefined)
		setPayableAmount(payable)
		return setAppliedPromoCode(promoCode)
	}

	return {
		arePromoCodesLoading,
		isPromoCodesError,
		promoCodesError,
		promoCodeApplyError,
		appliedPromoCode,
		applyPromoCode,
		payableAmount,
		promoCode,
		setPromoCode,
	}
}
