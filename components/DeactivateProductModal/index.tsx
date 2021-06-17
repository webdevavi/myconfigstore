import { ModalContent } from "@chakra-ui/modal"
import {
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalProps,
	useToast,
} from "@chakra-ui/react"
import { Field, FieldProps, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import { useDeactivateProductMutation } from "../../lib/hooks/product"
import { Card } from "../Card"

interface DeactivateProductFormValues {
	productId: string
}

const initialValues: DeactivateProductFormValues = {
	productId: "",
}

export const DeactivateProductModal: React.FC<Omit<ModalProps, "children"> & { storeId: string; productId: string }> = ({
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

	const { mutateAsync } = useDeactivateProductMutation({ storeId, productId })

	const toast = useToast()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 200 && data.message) {
				toast({
					title: "Deactivate Product",
					description: data.message,
					status: "success",
				})
				return props.onClose()
			}
		} catch (err) {
			return toast({
				title: "Deactivate Product",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Modal motionPreset="slideInBottom" closeOnOverlayClick={false} blockScrollOnMount scrollBehavior="inside" {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Deactivate Product</ModalHeader>
				<ModalCloseButton />
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{(formikProps) => (
						<Form>
							<ModalBody>
								<Card>
									<Field name="productId">
										{({ field, form }: FieldProps<string>) => (
											<FormControl isInvalid={Boolean(form.errors.productId)}>
												<FormLabel htmlFor="productId">
													Type <code>&quot;{productId}&quot;</code> to deactivate this product.
												</FormLabel>
												<Input {...field} id="productId" />
												<FormErrorMessage>
													<FormErrorIcon />
													{form.errors.productId}
												</FormErrorMessage>
												<FormHelperText>
													You will not be able to access this product through the API endpoint until you re-activate from here.
												</FormHelperText>
											</FormControl>
										)}
									</Field>
								</Card>
							</ModalBody>
							<ModalFooter>
								<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
									Deactivate Product
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}
