import { useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { AppContext, type ToastMessage } from "./AppContext";
import Toast from "../../components/Toast";
import * as apiClient from "../../api-client"

export const AppContextProvider = ({ children } : { children: ReactNode}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)

    const { isError } = useQuery({ queryKey: ['validateToken'], queryFn: apiClient.validateToken, retry: false});



    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage)
                },
                isLoggedIn: !isError
            }}
        >   
            {toast && (<Toast message={toast.message} type={toast.type}
                onClose={() => setToast(undefined)}
            />)}
            {children}
        </AppContext.Provider>
    );
};
