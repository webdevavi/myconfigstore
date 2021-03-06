import { Button, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, ModalProps, useToast, VStack } from "@chakra-ui/react"
import { useRegenerateStoreKeyMutation } from "@hooks"
import { Field, FieldProps, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

interface RegenerateStoreKeyFormValues {
	storeId: string
}

const initialValues: RegenerateStoreKeyFormValues = {
	storeId: "",
}

export const RegenerateStoreKeyModal: React.FC<Omit<ModalProps, "children"> & { storeId: string }> = ({ storeId, ...props }) => {
	const validationSchema = Yup.object({
		storeId: Yup.string()
			.matches(new RegExp(`^${storeId}$`), "Store id doesn't match.")
			.required()
			.label("Store Id"),
	})

	const { mutateAsync } = useRegenerateStoreKeyMutation({ storeId })

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
		<BottomPaper title="Regenerate Store Key" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card>
							<Field name="storeId">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.storeId)}>
										<FormLabel htmlFor="storeId">
											Type <code>&quot;{storeId}&quot;</code> to regenerate key for this store.
										</FormLabel>
										<Input {...field} id="storeId" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.storeId}
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
