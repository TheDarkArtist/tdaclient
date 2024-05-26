import { useState, createContext, useContext } from "react";


const AlertContext = createContext();

export const useAlertContext = () => useContext(AlertContext)

export const AlertProvider = ({ children }) =>{
	const [alert, setAlert] = useState();

	const showAlert = (message) =>{
		setAlert({message});
	}

	const hideAlert = () => {
			setAlert(null);
	}

	const value = {
		alert, 
		showAlert, 
		hideAlert
	}

	return(
		<AlertContext.Provider value={value}>
			{children}
		</AlertContext.Provider>
	)

}
