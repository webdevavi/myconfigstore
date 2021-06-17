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
import { useRegenerateStoreKeyMutation } from "../../lib/hooks/store"
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
				return toast({
					title: "Regenerate Key",
					description: data.message,
					status: "success",
				})
			}
		} catch (err) {
			if (err.response?.data?.error) {
				return toast({
					title: "Regenerate Key",
					description: err.response?.data?.error,
					status: "error",
				})
			}

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
				<ModalHeader>Regenerate Store Key</ModalHeader>
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
													Type <code>&quot;{storeId}&quot;</code> to regenerate key for this store.
												</FormLabel>
												<Input {...field} id="storeId" />
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
