import { Button, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, ModalProps, useToast, VStack } from "@chakra-ui/react"
import { useRegenerateProductKeyMutation } from "@hooks"
import { Field, FieldProps, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

interface RegenerateProductKeyFormValues {
	productId: string
}

const initialValues: RegenerateProductKeyFormValues = {
	productId: "",
}

export const RegenerateProductKeyModal: React.FC<Omit<ModalProps, "children"> & { storeId: string; productId: string }> = ({
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

	const { mutateAsync } = useRegenerateProductKeyMutation({ storeId, productId })

	const toast = useToast()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 201 && data.message) {
				toast({
					title: "Regenerate Key",
					description: data.message,
					status: "success",
				})

				return props.onClose()
			}
			return toast({
				title: "Regenerate Key",
				description: "Some unexpected error occurred",
				status: "error",
			})
		} catch (err) {
			return toast({
				title: "Regenerate Key",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<BottomPaper title="Regenerate Product Settings" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card>
							<Field name="productId">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.productId)}>
										<FormLabel htmlFor="productId">
											Type <code>&quot;{productId}&quot;</code> to regenerate key for this product.
										</FormLabel>
										<Input {...field} id="productId" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.productId}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Regenerate Key
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
