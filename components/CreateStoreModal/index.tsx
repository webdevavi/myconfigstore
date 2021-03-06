import {
	Button,
	FormControl,
	FormErrorIcon,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	ModalProps,
	useBreakpointValue,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import React from "react"
import * as Yup from "yup"
import { useCreateStoreMutation } from "../../lib/hooks/store"
import { FieldError } from "../../lib/types"
import { BottomPaper } from "../BottomPaper"
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

	const router = useRouter()

	const handleSubmit = async ({ storeId }: CreateStoreFormValues, helpers: FormikHelpers<CreateStoreFormValues>) => {
		try {
			const { status, data } = await mutateAsync({ storeId })

			if (status === 201 && data.message) {
				toast({
					title: "Create Store",
					description: data.message,
					status: "success",
				})

				props.onClose()
				return router.push(`/user/stores/${storeId}`)
			}

			return toast({
				title: "Create Store",
				description: "Some error occurred",
				status: "error",
			})
		} catch (err) {
			if (err.fieldErrors && err.fieldErrors.length > 0) {
				const { fieldErrors } = err as { fieldErrors: FieldError[] }

				return fieldErrors?.map(({ field, error }) => helpers.setFieldError(field, error))
			}

			return toast({
				title: "Create Store",
				description: err.message,
				status: "error",
			})
		}
	}

	const isSmallScreen = useBreakpointValue({ base: true, md: false })

	return (
		<BottomPaper title="Create New Store" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card>
							<Field name="storeId">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.storeId)}>
										<FormLabel htmlFor="storeId">Store Id</FormLabel>
										<InputGroup>
											{!isSmallScreen && (
												<InputLeftAddon fontSize="sm" fontWeight="black">
													https://
												</InputLeftAddon>
											)}
											<Input {...field} id="storeId" placeholder="eg. my_store" autoComplete="off" />
											{!isSmallScreen && (
												<InputRightAddon fontSize="sm" fontWeight="black">
													.myconfig.store/api/v1
												</InputRightAddon>
											)}
										</InputGroup>
										{isSmallScreen && (
											<FormHelperText fontSize="sm" fontWeight="black" wordBreak="break-all">
												https://{field.value || "{store_id}"}.myconfig.store/api/v1
											</FormHelperText>
										)}
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.storeId}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</Card>

						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Create Store
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
