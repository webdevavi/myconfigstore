import { Button, Flex, Modal, ModalBody, ModalContent, Text, VStack } from "@chakra-ui/react"
import { useDrawer } from "@lib/hooks/drawer"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import React from "react"

export const DrawerModal: React.FC = () => {
	const [session] = useSession()

	const router = useRouter()

	const { isOpen, onClose } = useDrawer()

	const push = (path: string) => () => {
		onClose()
		router.push(path)
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			variant="drawer"
			autoFocus={false}
			blockScrollOnMount
			motionPreset="slideInBottom"
			scrollBehavior="inside"
		>
			<ModalContent alignSelf="flex-end" h="full" maxH="full" m="0">
				<ModalBody as={VStack} alignItems="stretch" bg="brand.dark" p="8" justify="space-evenly">
					{session ? (
						<>
							<Button variant="link" fontSize="2xl" textAlign="center" onClick={push("/user/stores")}>
								Stores
							</Button>
							<Button variant="link" fontSize="2xl" textAlign="center" onClick={push("/user/billing")}>
								Billing
							</Button>
							<Button variant="link" fontSize="2xl" textAlign="center" onClick={push("/user/usage")}>
								Usage
							</Button>
							<Button variant="link" fontSize="2xl" textAlign="center" onClick={push("https://docs.myconfig.store")}>
								Docs
							</Button>
							<Button variant="outline" fontSize="2xl" onClick={push("/auth/signout")}>
								Sign Out
							</Button>
						</>
					) : (
						<>
							<Button variant="link" fontSize="2xl" textAlign="center" onClick={push("/")}>
								Home
							</Button>
							<Button variant="link" fontSize="2xl" textAlign="center" onClick={push("/pricing")}>
								Pricing
							</Button>
							<Button variant="link" fontSize="2xl" textAlign="center" onClick={push("https://docs.myconfig.store")}>
								Docs
							</Button>
							<Button fontSize="2xl" onClick={push("/auth/signin")}>
								Sign In
							</Button>
						</>
					)}
					<VStack w="full">
						<Flex justify="center" flexWrap="wrap">
							<Button variant="link" mx="2" fontSize="md" opacity="0.6" onClick={push("/terms")}>
								Terms & Condition
							</Button>
							<Button variant="link" mx="2" fontSize="md" opacity="0.6" onClick={push("/privacy")}>
								Privacy Policy
							</Button>
							<Button variant="link" mx="2" fontSize="md" opacity="0.6" onClick={push("/cookies")}>
								Cookies Policy
							</Button>
							<Button variant="link" mx="2" fontSize="md" opacity="0.6" onClick={push("/refund")}>
								Refund & Cancellation Policy
							</Button>
						</Flex>
						<Text fontFamily="Muli" fontSize="sm" fontWeight="black" color="brand.orange" opacity="0.6">
							&copy; {new Date().getFullYear()} My Config Store
						</Text>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
