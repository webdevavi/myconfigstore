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
import { useCreateProductMutation } from "../../lib/hooks/product"
import { FieldError } from "../../lib/types"
import { Card } from "../Card"

interface CreateProductFormValues {
	productId: string
}

const initialValues: CreateProductFormValues = {
	productId: "",
}

const validationSchema = Yup.object({
	productId: Yup.string()
		.matches(/^[a-zA-Z0-9_]*$/, "Only alphabets, numbers and underscore is allowed.")
		.required()
		.label("Product Id"),
})

export const CreateProductModal: React.FC<Omit<ModalProps, "children"> & { storeId: string }> = ({ storeId, ...props }) => {
	const { mutateAsync } = useCreateProductMutation({ storeId })

	const toast = useToast()

	const handleSubmit = async ({ productId }: CreateProductFormValues, helpers: FormikHelpers<CreateProductFormValues>) => {
		try {
			const { status, data } = await mutateAsync({ productId })

			if (status === 201 && data.message) {
				return toast({
					title: "Create Product",
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
					title: "Create Product",
					description: err.response?.data?.error,
					status: "error",
				})
			}

			return toast({
				title: "Create Product",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Modal motionPreset="slideInBottom" closeOnOverlayClick={false} blockScrollOnMount scrollBehavior="inside" {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create New Product</ModalHeader>
				<ModalCloseButton />
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{(formikProps) => (
						<Form>
							<ModalBody>
								<Card>
									<Field name="productId">
										{({ field, form }: FieldProps<"productId">) => (
											<FormControl isInvalid={Boolean(form.errors.productId)}>
												<FormLabel htmlFor="productId">Product Id</FormLabel>
												<InputGroup>
													<InputLeftAddon fontSize="sm" fontWeight="black">
														https://{storeId}.myconfig.store/api/
													</InputLeftAddon>
													<Input {...field} id="productId" placeholder="eg. my_product" />
												</InputGroup>
												<FormErrorMessage>
													<FormErrorIcon />
													{form.errors.productId}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</Card>
							</ModalBody>
							<ModalFooter>
								<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
									Create Product
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}
