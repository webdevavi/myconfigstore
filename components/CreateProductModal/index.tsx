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
	ModalProps,
	useBreakpointValue,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { useCreateProductMutation } from "@hooks"
import { FieldError } from "@lib/types"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import React from "react"
import * as Yup from "yup"
import { BottomPaper } from "../BottomPaper"
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

	const router = useRouter()

	const handleSubmit = async ({ productId }: CreateProductFormValues, helpers: FormikHelpers<CreateProductFormValues>) => {
		try {
			const { status, data } = await mutateAsync({ productId })

			if (status === 201 && data.message) {
				toast({
					title: "Create Product",
					description: data.message,
					status: "success",
				})

				props.onClose()
				return router.push(`/user/stores/${storeId}/${productId}`)
			}

			return toast({
				title: "Create Product",
				description: "Some error occurred",
				status: "error",
			})
		} catch (err) {
			if (err.fieldErrors && err.fieldErrors.length > 0) {
				const { fieldErrors } = err as { fieldErrors: FieldError[] }

				return fieldErrors?.map(({ field, error }) => helpers.setFieldError(field, error))
			}

			return toast({
				title: "Create Product",
				description: err.message,
				status: "error",
			})
		}
	}

	const isSmallScreen = useBreakpointValue({ base: true, md: false })

	return (
		<BottomPaper title="Create New Product" {...props}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				{(formikProps) => (
					<VStack as={Form} w="full" spacing="8" px="2">
						<Card maxW="">
							<Field name="productId">
								{({ field, form }: FieldProps<string>) => (
									<FormControl isInvalid={Boolean(form.errors.productId)}>
										<FormLabel htmlFor="productId">Product Id</FormLabel>
										<InputGroup>
											{!isSmallScreen && (
												<InputLeftAddon fontSize="sm" fontWeight="black">
													https://{storeId}.myconfig.store/api/v1/
												</InputLeftAddon>
											)}
											<Input {...field} id="productId" placeholder="eg. my_product" autoComplete="off" />
										</InputGroup>
										{isSmallScreen && (
											<FormHelperText fontSize="sm" fontWeight="black" wordBreak="break-all">
												https://{storeId}.myconfig.store/api/v1/{field.value || "{product_id}"}
											</FormHelperText>
										)}
										<FormErrorMessage>
											<FormErrorIcon />
											{form.errors.productId}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</Card>
						<Button type="submit" isLoading={formikProps.isSubmitting} isDisabled={!formikProps.isValid}>
							Create Product
						</Button>
					</VStack>
				)}
			</Formik>
		</BottomPaper>
	)
}
