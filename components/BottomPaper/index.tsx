import { Modal, ModalOverlay, ModalContent, ModalBody, Box, ModalHeader, ModalCloseButton, useBreakpointValue, ModalProps } from "@chakra-ui/react"
import React from "react"

export type BottomPaperProps = ModalProps & {
	title: string
}

export const BottomPaper: React.FC<BottomPaperProps> = ({ children, title, ...props }) => {
	const variant = useBreakpointValue({ base: "drawer", md: "none" })
	const isTopBarVisible = useBreakpointValue({ base: true, md: false })

	return (
		<Modal variant={variant} motionPreset="slideInBottom" blockScrollOnMount autoFocus={false} scrollBehavior="inside" {...props}>
			{" "}
			<ModalOverlay />
			<ModalContent boxShadow={{ base: "dark-lg", md: "none" }} borderTopRadius={{ base: "2xl", md: "none" }} pb="8">
				<ModalBody p="0">
					{isTopBarVisible && <Box w="25%" mx="auto" mt="4" mb="2" h="1" bg="brand.orange" opacity="0.25" />}
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					{children}
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
