import { ModalContent } from "@chakra-ui/modal"
import {
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalProps,
	useToast,
} from "@chakra-ui/react"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import React from "react"
import * as Yup from "yup"
import { useCreateStoreMutation } from "../../lib/hooks/store"
import { FieldError } from "../../lib/types"
import { Card } from "../Card"

interface CreateStoreFormValues {
	storeId: string
}

const initialValues: CreateStoreFormValues = {
	storeId: "",
}

const validationSchema = Yup.object({
	storeId: Yup.string()
		.matches(/^[a-zA-Z0-9_]*$/, "Only alphabets, numbers and underscore is allowed.")
		.required()
		.label("Store Id"),
})

export const CreateStoreModal: React.FC<Omit<ModalProps, "children">> = (props) => {
	const { mutateAsync } = useCreateStoreMutation()

	const toast = useToast()

	const handleSubmit = async ({ storeId }: CreateStoreFormValues, helpers: FormikHelpers<CreateStoreFormValues>) => {
		try {
			const { status, data } = await mutateAsync({ storeId })

			if (status === 201 && data.message) {
				return toast({
					title: "Create Store",
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
					title: "Create Store",
					description: err.response?.data?.error,
					status: "error",
				})
			}

			return toast({
				title: "Create Store",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Modal motionPreset="slideInBottom" closeOnOverlayClick={false} blockScrollOnMount scrollBehavior="inside" {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create New Store</ModalHeader>
				<ModalCloseButton />
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{(formikProps) => (
						<Form>
							<ModalBody>
								<Card>
									<Field name="storeId">
										{({ field, form }: FieldProps<string>) => (
											<FormControl isInvalid={Boolean(form.errors.storeId)}>
												<FormLabel htmlFor="storeId">Store Id</FormLabel>
												<InputGroup>
													<InputLeftAddon fontSize="sm" fontWeight="black">
														https://
													</InputLeftAddon>
													<Input {...field} id="storeId" placeholder="eg. my_store" />
													<InputRightAddon fontSize="sm" fontWeight="black">
														.myconfig.store/api
													</InputRightAddon>
												</InputGroup>
												<FormErrorMessage>
													<FormErrorIcon />
													{form.errors.storeId}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</Card>
							</ModalBody>
							<ModalFooter>
								<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
									Create Store
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}
