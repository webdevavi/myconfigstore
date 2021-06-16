import { ModalContent } from "@chakra-ui/modal"
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalProps,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import React from "react"
import * as Yup from "yup"
import { useCreateFieldMutation } from "../../lib/hooks/product"
import { FieldError } from "../../lib/types"
import { Card } from "../Card"

interface CreateFieldFormValues {
	key: string
	value: string
	isEncrypted: boolean
}

const initialValues: CreateFieldFormValues = {
	key: "",
	value: "",
	isEncrypted: true,
}

const validationSchema = Yup.object({
	key: Yup.string()
		.matches(/^[a-zA-Z0-9_]*$/, "Only alphabets, numbers and underscore is allowed.")
		.required()
		.label("Field Key"),
	value: Yup.string().required().label("Field Value"),
})

export const CreateFieldModal: React.FC<Omit<ModalProps, "children"> & { storeId: string; productId: string }> = ({
	storeId,
	productId,
	...props
}) => {
	const { mutateAsync } = useCreateFieldMutation({ storeId, productId })

	const toast = useToast()

	const handleSubmit = async ({ key, value, isEncrypted }: CreateFieldFormValues, helpers: FormikHelpers<CreateFieldFormValues>) => {
		try {
			const { status, data } = await mutateAsync({ key, value, isEncrypted })

			if (status === 201 && data.message) {
				return toast({
					title: "Create Field",
					description: data.message,
					status: "success",
				})
			}
		} catch (err) {
			if (err.response?.data?.fieldErrors && err.response?.data?.fieldErrors.length > 0) {
				const { fieldErrors } = err.response.data as { fieldErrors: FieldError[] }

				return fieldErrors?.map(({ field, error }) => helpers.setFieldError(field, error))
			}

			if (err.response?.data?.error) {
				return toast({
					title: "Create Field",
					description: err.response?.data?.error,
					status: "error",
				})
			}

			return toast({
				title: "Create Field",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Modal motionPreset="slideInBottom" closeOnOverlayClick={false} blockScrollOnMount scrollBehavior="inside" {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create New Field</ModalHeader>
				<ModalCloseButton />
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{(formikProps) => (
						<Form>
							<ModalBody>
								<Card as={VStack} alignItems="flex-start">
									<Field name="key">
										{({ field, form }: FieldProps<"key">) => (
											<FormControl isInvalid={Boolean(form.errors.key && form.touched.key)}>
												<FormLabel htmlFor="key">Field Key</FormLabel>
												<Input {...field} id="key" placeholder="eg. first_name" />
												<FormErrorMessage>
													<FormErrorIcon />
													{form.errors.key}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="value">
										{({ field, form }: FieldProps<"value">) => (
											<FormControl isInvalid={Boolean(form.errors.value && form.touched.value)}>
												<FormLabel htmlFor="value">Field Value</FormLabel>
												<Input {...field} id="value" placeholder="eg. avinash" />
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
							</ModalBody>
							<ModalFooter>
								<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
									Create Field
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}
