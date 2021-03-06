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
import { useDestroyStoreMutation } from "@hooks"
import { Field, FieldProps, Form, Formik } from "formik"
import { useRouter } from "next/router"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
import { Card } from "../Card"

interface DestroyStoreFormValues {
	storeId: string
}

const initialValues: DestroyStoreFormValues = {
	storeId: "",
}

export const DestroyStoreModal: React.FC<Omit<ModalProps, "children"> & { storeId: string }> = ({ storeId, ...props }) => {
	const validationSchema = Yup.object({
		storeId: Yup.string()
			.matches(new RegExp(`^${storeId}$`), "Store id doesn't match.")
			.required()
			.label("Store Id"),
	})

	const { mutateAsync } = useDestroyStoreMutation({ storeId })

	const toast = useToast()

	const router = useRouter()

	const handleSubmit = async () => {
		try {
			const { status, data } = await mutateAsync()

			if (status === 200 && data.message) {
				toast({
					title: "Destroy Store",
					description: data.message,
					status: "success",
				})
				props.onClose()
				return router.replace(`/user/stores`)
			}

			return toast({
				title: "Destroy Store",
				description: "Some unexpected error occurred",
				status: "error",
			})
		} catch (err) {
			return toast({
				title: "Destroy Store",
				description: err.message,
				status: "error",
			})
		}
	}

	return (
		<BottomPaper title="Destroy Store" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card>
							<Field name="storeId">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.storeId)}>
										<FormLabel htmlFor="storeId">
											Type <code>&quot;{storeId}&quot;</code> to destroy this store.
										</FormLabel>
										<Input {...field} id="storeId" autoComplete="off" />
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.storeId}
										</FormErrorMessage>
										<FormHelperText>
											You must be sure about destroying this store, all the data in this store will be permanently deleted and none of it can be
											restored later.
										</FormHelperText>
									</FormControl>
								)}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Destroy Store
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
