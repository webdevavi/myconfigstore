import {
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	ModalProps,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { useReactivateProductMutation } from "@hooks"
import { Field, FieldProps, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

interface ReactivateProductFormValues {
	productId: string
}

const initialValues: ReactivateProductFormValues = {
	productId: "",
}

export const ReactivateProductModal: React.FC<Omit<ModalProps, "children"> & { storeId: string; productId: string }> = ({
	storeId,
	productId,
	...props
}) => {
	const validationSchema = Yup.object({
		productId: Yup.string()
			.matches(new RegExp(`^${productId}$`), "Product id doesn't match.")
			.required()
			.label("Product Id"),
	})

	const { mutateAsync } = useReactivateProductMutation({ storeId, productId })

	const toast = useToast()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 200 && data.message) {
				toast({
					title: "Reactivate Product",
					description: data.message,
					status: "success",
				})
				return props.onClose()
			}

			return toast({
				title: "Reactivate Product",
				description: "Some unexpected error occurred",
				status: "error",
			})
		} catch (err) {
			return toast({
				title: "Reactivate Product",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<BottomPaper title="Reactivate Product" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card>
							<Field name="productId">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.productId)}>
										<FormLabel htmlFor="productId">
											Type <code>&quot;{productId}&quot;</code> to reactivate this product.
										</FormLabel>
										<Input {...field} id="productId" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.productId}
										</FormErrorMessage>
										<FormHelperText>You will be able to access this product as usual.</FormHelperText>
									</FormControl>
								)}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Reactivate Product
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
