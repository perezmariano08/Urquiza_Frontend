import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const toast = useRef(null);

    return (
        <ToastContext.Provider value={toast}>
            <Toast ref={toast} position="top-center"/>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
