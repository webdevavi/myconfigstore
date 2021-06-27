import { Button, Checkbox, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, HStack, ModalProps, useToast, VStack } from "@chakra-ui/react"
import { useEditProductSettingsMutation } from "@hooks"
import { IProduct } from "@models"
import { FieldError } from "@types"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import React from "react"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

export type EditProductSettingsFormValues = Pick<IProduct, "isPrivate" | "isUsingStoreKey">

export const EditProductSettingsModal: React.FC<Omit<ModalProps, "children"> & { product: IProduct }> = ({ product, ...props }) => {
	const { mutateAsync } = useEditProductSettingsMutation({ storeId: product.storeId, productId: product.productId })

	const toast = useToast()

	const handleSubmit = async (
		{ isPrivate, isUsingStoreKey }: EditProductSettingsFormValues,
		helpers: FormikHelpers<EditProductSettingsFormValues>
	) => {
		try {
			const { status, data } = await mutateAsync({ isPrivate, isUsingStoreKey })

			if (status === 201 && data.message) {
				toast({
					title: "Product Settings",
					description: data.message,
					status: "success",
				})

				return props.onClose()
			}

			return toast({
				title: "Product Settings",
				description: "Some unexpected error occurred.",
				status: "error",
			})
		} catch (err) {
			if (err.fieldErrors && err.fieldErrors.length > 0) {
				const { fieldErrors } = err as { fieldErrors: FieldError[] }

				return fieldErrors?.map(({ field, error }) => helpers.setFieldError(field, error))
			}

			return toast({
				title: "Product Settings",
				description: err.message,
				status: "error",
			})
		}
	}

	const initialValues: EditProductSettingsFormValues = {
		isPrivate: product.isPrivate,
		isUsingStoreKey: product.isUsingStoreKey,
	}

	return (
		<BottomPaper title="Edit Product Settings" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card as={VStack} alignItems="flex-start">
							<Field name="isPrivate">
								{({ field, form }: FieldProps<boolean>) => (
									<FormControl isInvalid={Boolean(form.errors.isPrivate && form.touched.isPrivate)}>
										<HStack>
											<Checkbox onChange={field.onChange} onBlur={field.onBlur} isChecked={field.value} id="isPrivate" />
											<FormLabel htmlFor="isPrivate">Private (Default)</FormLabel>
										</HStack>
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.isPrivate}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="isUsingStoreKey">
								{({ field, form }: FieldProps<boolean>) =>
									form.values.isPrivate && (
										<FormControl isInvalid={Boolean(form.errors.isUsingStoreKey && form.touched.isUsingStoreKey)}>
											<HStack>
												<Checkbox onChange={field.onChange} onBlur={field.onBlur} isChecked={field.value} id="isUsingStoreKey" />
												<FormLabel htmlFor="isUsingStoreKey">Use only store key (Default)</FormLabel>
											</HStack>
											<FormErrorMessage>
												<FormErrorIcon />
												{form.errors.isUsingStoreKey}
											</FormErrorMessage>
										</FormControl>
									)
								}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Save Settings
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
