import { createContext } from "react";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
