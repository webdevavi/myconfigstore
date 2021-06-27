import {
	Button,
	Checkbox,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	ModalProps,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { useEditFieldMutation } from "@hooks"
import { IField } from "@models"
import { FieldError } from "@types"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

const validationSchema = Yup.object({
	key: Yup.string()
		.matches(/^[a-zA-Z0-9_]*$/, "Only alphabets, numbers and underscore is allowed.")
		.required()
		.label("Field Key"),
	value: Yup.string().required().label("Field Value"),
})

export const EditFieldModal: React.FC<Omit<ModalProps, "children"> & { storeId: string; productId: string; initialValues: IField }> = ({
	storeId,
	productId,
	initialValues,
	...props
}) => {
	const { mutateAsync } = useEditFieldMutation({ storeId, productId, key: initialValues.key })

	const toast = useToast()

	const handleSubmit = async ({ key, value, isEncrypted }: IField, helpers: FormikHelpers<IField>) => {
		try {
			const { status, data } = await mutateAsync({ key, value, isEncrypted })

			if (status === 201 && data.message) {
				toast({
					title: "Edit Field",
					description: data.message,
					status: "success",
				})

				return props.onClose()
			}

			return toast({
				title: "Edit Field",
				description: "Some unexpected error occurred",
				status: "error",
			})
		} catch (err) {
			if (err.fieldErrors && err.fieldErrors.length > 0) {
				const { fieldErrors } = err as { fieldErrors: FieldError[] }

				return fieldErrors?.map(({ field, error }) => helpers.setFieldError(field, error))
			}

			return toast({
				title: "Edit Field",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<BottomPaper title="Edit Field" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card as={VStack} alignItems="flex-start">
							<Field name="key">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.key && form.touched.key)}>
										<FormLabel htmlFor="key">Field Key</FormLabel>
										<Input {...field} id="key" placeholder="eg. first_name" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.key}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="value">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.value && form.touched.value)}>
										<FormLabel htmlFor="value">Field Value</FormLabel>
										<Input {...field} id="value" placeholder="eg. avinash" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.value}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="isEncrypted">
								{({ field, form }: FieldProps<boolean>) => (
									<FormControl isInvalid={Boolean(form.errors.isEncrypted && form.touched.isEncrypted)}>
										<HStack>
											<Checkbox onChange={field.onChange} onBlur={field.onBlur} isChecked={field.value} id="isEncrypted" />
											<FormLabel htmlFor="isEncrypted">Encrypted</FormLabel>
										</HStack>
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.isEncrypted}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Save
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
