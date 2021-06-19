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
import { useDestroyProductMutation } from "@hooks"
import { Field, FieldProps, Form, Formik } from "formik"
import { useRouter } from "next/router"
import React from "react"
import * as Yup from "yup"
import { Card } from "../Card"

interface DestroyProductFormValues {
	productId: string
}

const initialValues: DestroyProductFormValues = {
	productId: "",
}

export const DestroyProductModal: React.FC<Omit<ModalProps, "children"> & { storeId: string; productId: string }> = ({
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

	const { mutateAsync } = useDestroyProductMutation({ storeId, productId })

	const toast = useToast()

	const router = useRouter()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 200 && data.message) {
				toast({
					title: "Destroy Product",
					description: data.message,
					status: "success",
				})
				props.onClose()
				return router.replace(`/user/stores/${storeId}`)
			}
			return toast({
				title: "Destroy Product",
				description: "Some unexpected error occurred.",
				status: "error",
			})
		} catch (err) {
			return toast({
				title: "Destroy Product",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Modal motionPreset="slideInBottom" closeOnOverlayClick={false} blockScrollOnMount scrollBehavior="inside" {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Destroy Product</ModalHeader>
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
													Type <code>&quot;{productId}&quot;</code> to destroy this product.
												</FormLabel>
												<Input {...field} id="productId" />
												<FormErrorMessage>
													<FormErrorIcon />
													{form.errors.productId}
												</FormErrorMessage>
												<FormHelperText>
													You must be sure about destroying this product, all the data in this product will be permanently deleted and none of it can
													be restored later.
												</FormHelperText>
											</FormControl>
										)}
									</Field>
								</Card>
							</ModalBody>
							<ModalFooter>
								<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
									Destroy Product
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}
