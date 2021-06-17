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
import { useReactivateStoreMutation } from "../../lib/hooks/store"
import { Card } from "../Card"

interface ReactivateStoreFormValues {
	storeId: string
}

const initialValues: ReactivateStoreFormValues = {
	storeId: "",
}

export const ReactivateStoreModal: React.FC<Omit<ModalProps, "children"> & { storeId: string }> = ({ storeId, ...props }) => {
	const validationSchema = Yup.object({
		storeId: Yup.string()
			.matches(new RegExp(`^${storeId}$`), "Store id doesn't match.")
			.required()
			.label("Store Id"),
	})

	const { mutateAsync } = useReactivateStoreMutation({ storeId })

	const toast = useToast()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 200 && data.message) {
				toast({
					title: "Reactivate Store",
					description: data.message,
					status: "success",
				})
				return props.onClose()
			}
		} catch (err) {
			if (err.response?.data?.error) {
				return toast({
					title: "Reactivate Store",
					description: err.response?.data?.error,
					status: "error",
				})
			}

			return toast({
				title: "Reactivate Store",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<Modal motionPreset="slideInBottom" closeOnOverlayClick={false} blockScrollOnMount scrollBehavior="inside" {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Reactivate Store</ModalHeader>
				<ModalCloseButton />
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{(formikProps) => (
						<Form>
							<ModalBody>
								<Card>
									<Field name="storeId">
										{({ field, form }: FieldProps<string>) => (
											<FormControl isInvalid={Boolean(form.errors.storeId)}>
												<FormLabel htmlFor="storeId">
													Type <code>&quot;{storeId}&quot;</code> to reactivate this store.
												</FormLabel>
												<Input {...field} id="storeId" />
												<FormErrorMessage>
													<FormErrorIcon />
													{form.errors.storeId}
												</FormErrorMessage>
												<FormHelperText>You will be able to access all products from this store as usual.</FormHelperText>
											</FormControl>
										)}
									</Field>
								</Card>
							</ModalBody>
							<ModalFooter>
								<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
									Reactivate Store
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}
