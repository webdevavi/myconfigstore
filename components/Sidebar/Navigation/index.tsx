import { Flex, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FaCreditCard, FaNewspaper, FaWindowRestore } from "react-icons/fa"
import { NavigationButton } from "../../NavigationButton"

export const NavigationSidebar: React.FC<unknown> = () => {
	const { pathname } = useRouter()

	const isActive = React.useCallback((path: string) => pathname.includes(path), [pathname])

	return (
		<Flex as="header" pos="relative" flexDir="column" alignItems="flex-end">
			<Flex flexDir="column" w={{ base: 0, sm: "24", lg: "xs" }} h="0">
				<Flex pos="fixed" alignItems="stretch" top="0" height="full">
					<Flex
						flexDir="column"
						justifyContent="space-between"
						alignItems="flex-end"
						overflowY="auto"
						d={["none", "flex"]}
						w={{ base: 0, sm: "24", lg: "xs" }}
						bg="brand.dark2"
					>
						<VStack w="full" mb="8" pt="24">
							<NavigationButton icon={FaWindowRestore} isActive={isActive("/user/stores")}>
								Stores
							</NavigationButton>

							<NavigationButton icon={FaCreditCard} isActive={isActive("/user/billing")}>
								Billing
							</NavigationButton>

							<NavigationButton icon={FaNewspaper} isActive={isActive("/docs")}>
								Docs
							</NavigationButton>
						</VStack>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}
