import { ModalContent } from "@chakra-ui/modal"
import {
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
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
import { useRegenerateProductKeyMutation } from "../../lib/hooks/product"
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
				return toast({
					title: "Regenerate Key",
					description: data.message,
					status: "success",
				})
			}
		} catch (err) {
			return toast({
				title: "Regenerate Key",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Modal motionPreset="slideInBottom" closeOnOverlayClick={false} blockScrollOnMount scrollBehavior="inside" {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Regenerate Product Key</ModalHeader>
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
													Type <code>&quot;{productId}&quot;</code> to regenerate key for this product.
												</FormLabel>
												<Input {...field} id="productId" />
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
									Regenerate Key
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}