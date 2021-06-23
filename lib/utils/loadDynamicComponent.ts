import { ComponentLoadingIndicator } from "@components"
import dynamic from "next/dynamic"
import React from "react"

export const loadDynamicComponent = <T extends {}>(importFn: () => Promise<React.FC<T>>) =>
	dynamic<T>(importFn, {
		loading: ComponentLoadingIndicator,
	})
