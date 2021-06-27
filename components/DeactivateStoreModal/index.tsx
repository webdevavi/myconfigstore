import {
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	ModalProps,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { useDeactivateStoreMutation } from "@hooks"
import { Field, FieldProps, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

interface DeactivateStoreFormValues {
	storeId: string
}

const initialValues: DeactivateStoreFormValues = {
	storeId: "",
}

export const DeactivateStoreModal: React.FC<Omit<ModalProps, "children"> & { storeId: string }> = ({ storeId, ...props }) => {
	const validationSchema = Yup.object({
		storeId: Yup.string()
			.matches(new RegExp(`^${storeId}$`), "Store id doesn't match.")
			.required()
			.label("Store Id"),
	})

	const { mutateAsync } = useDeactivateStoreMutation({ storeId })

	const toast = useToast()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 200 && data.message) {
				toast({
					title: "Deactivate Store",
					description: data.message,
					status: "success",
				})
				return props.onClose()
			}

			return toast({
				title: "Deactivate Store",
				description: "Some error occurred",
				status: "error",
			})
		} catch (err) {
			return toast({
				title: "Deactivate Store",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<BottomPaper title="Deactivate Store" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card>
							<Field name="storeId">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.storeId)}>
										<FormLabel htmlFor="storeId">
											Type <code>&quot;{storeId}&quot;</code> to deactivate this store.
										</FormLabel>
										<Input {...field} id="storeId" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.storeId}
										</FormErrorMessage>
										<FormHelperText>
											You will not be able to access any product from this store through the API endpoints until you re-activate from here.
										</FormHelperText>
									</FormControl>
								)}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Deactivate Store
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
