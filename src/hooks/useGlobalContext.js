import { createContext, useContext, useState } from 'react';
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Theme, setTheme] = useState(true);

	return (
		<GlobalContext.Provider
		value={{
			MenuOpen,
			setMenuOpen,
			ModalOpen,
			setModalOpen,
			Theme,
			setTheme,
		}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	return globalContext;
}