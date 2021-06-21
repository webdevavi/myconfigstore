import { Table, Thead, Tr, Th, Tbody, Td, Text } from "@chakra-ui/react"
import numeral from "numeral"
import React from "react"

interface PlanDetailsContainerProps {
	selectedPlan: {
		label: string
		days: number
		bill: number
		features: {
			stores: number
			products: number
			fields: number
			rateLimit: number
			support: boolean
		}
	}
}

export const PlanDetailsContainer: React.FC<PlanDetailsContainerProps> = ({ selectedPlan }) => (
	<Table size="lg">
		<Thead>
			<Tr>
				<Th>Stores</Th>
				<Th>Products</Th>
				<Th>Fields</Th>
				<Th>
					Rate Limit <Text fontSize="sm">(req./min)</Text>
				</Th>
				<Th>Price</Th>
			</Tr>
		</Thead>
		<Tbody>
			<Tr>
				<Td>{numeral(selectedPlan.features.stores).format("0a").toUpperCase()}</Td>
				<Td>{numeral(selectedPlan.features.products).format("0a").toUpperCase()}</Td>
				<Td>{numeral(selectedPlan.features.fields).format("0a").toUpperCase()}</Td>
				<Td>{numeral(selectedPlan.features.rateLimit).format("0a").toUpperCase()}</Td>
				<Td>
					<Text fontWeight="black" fontSize="xl" color="brand.orange">
						{numeral(selectedPlan.bill).format("$0.00a").toUpperCase()}
					</Text>
				</Td>
			</Tr>
		</Tbody>
	</Table>
)
