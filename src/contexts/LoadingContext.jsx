import {useState, useContext, createContext } from 'react';

const LoadingContext = createContext();

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider = ({children}) => {
	const [loading, setLoading] = useState(false);

	const showLoading = () => setLoading(true);
	const hideLoading = () => setLoading(false);

	const value = {
		loading, 
		showLoading,
		hideLoading,
	};

	return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}
