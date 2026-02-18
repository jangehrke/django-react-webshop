import {createContext, useContext, useState} from "react";

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message, timeout = 5000) => {
        setAlert({type, message});
        setTimeout(() => {
            setAlert(null);
        }, timeout)
    }

    return (
        <AlertContext.Provider value={{showAlert}}>
            {alert && (
                <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4"
                     style={{ zIndex: 9999 }}>
                    <div className={`alert alert-${alert.type} text-center`} role="alert">
                        {alert.message}
                    </div>
                </div>
            )
            }
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext);