import { Button, Center, CircularProgress, HStack, Text } from "@chakra-ui/react"
import React from "react"
import { DynamicOptions } from "next/dynamic"

export const ComponentLoadingIndicator: DynamicOptions["loading"] = ({ error, retry, timedOut, pastDelay }) => {
	if (error) {
		return (
			<Center>
				<HStack>
					<Text color="brand.error">Error!</Text>{" "}
					<Button size="md" onClick={retry}>
						Retry
					</Button>
				</HStack>
			</Center>
		)
	}
	if (timedOut) {
		return (
			<Center>
				<HStack>
					<Text color="brand.error">Taking a long time...</Text>{" "}
					<Button size="md" onClick={retry}>
						Retry
					</Button>
				</HStack>
			</Center>
		)
	}
	if (pastDelay) {
		return (
			<Center>
				<CircularProgress color="brand.orange" trackColor="brand.light" isIndeterminate />
			</Center>
		)
	}
	return null
}
