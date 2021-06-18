import { CurrentUserContextProvider } from "./currentUser"

export const ContextProvider: React.FC = ({ children }) => {
	return <CurrentUserContextProvider>{children}</CurrentUserContextProvider>
}
