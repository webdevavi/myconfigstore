import { Button, FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, ModalProps, useToast, VStack } from "@chakra-ui/react"
import { useRemoveFieldMutation } from "@hooks"
import { Field, FieldProps, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

interface RemoveFieldFormValues {
	key: string
}

const initialValues: RemoveFieldFormValues = {
	key: "",
}

export const RemoveFieldModal: React.FC<Omit<ModalProps, "children"> & { storeId: string; productId: string; fieldKey: string }> = ({
	storeId,
	productId,
	fieldKey,
	...props
}) => {
	const validationSchema = Yup.object({
		key: Yup.string()
			.matches(new RegExp(`^${fieldKey}$`), "Key doesn't match.")
			.required()
			.label("Field Key"),
	})

	const { mutateAsync } = useRemoveFieldMutation({ storeId, productId, key: fieldKey })

	const toast = useToast()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 201 && data.message) {
				toast({
					title: "Remove Field",
					description: data.message,
					status: "success",
				})

				return props.onClose()
			}

			return toast({
				title: "Remove Field",
				description: "Some unexpected error occurred",
				status: "error",
			})
		} catch (err) {
			return toast({
				title: "Remove Field",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<BottomPaper title="Remove Field" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card>
							<Field name="key">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.key)}>
										<FormLabel htmlFor="key">
											Type <code>&quot;{fieldKey}&quot;</code> to remove this field.
										</FormLabel>
										<Input {...field} id="key" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.key}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Remove
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
