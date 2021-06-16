import { Checkbox, FormLabel, Heading, HStack, Input, Stack, VStack } from "@chakra-ui/react"
import React from "react"
import { Field } from "../../lib/models"
import { Card } from "../Card"

interface FieldContainerProps {
	field: Field
}

export const FieldContainer: React.FC<FieldContainerProps> = ({ field }) => (
	<Card maxW="4xl" as={Stack} alignItems="flex-start">
		<Stack w="full" direction={{ md: "row" }} alignItems="flex-start">
			<VStack w="full" alignItems="flex-start">
				<FormLabel>Key</FormLabel>
				<Input value={field.key} isReadOnly />
			</VStack>
			<VStack w="full" alignItems="flex-start">
				<FormLabel>Value</FormLabel>
				<Input value={field.value} isReadOnly />
			</VStack>
		</Stack>
		<HStack>
			<Checkbox isChecked={field.isEncrypted} isReadOnly />
			<Heading fontSize="lg" color="brand.orange">
				Encrypted (Default)
			</Heading>
		</HStack>
	</Card>
)
