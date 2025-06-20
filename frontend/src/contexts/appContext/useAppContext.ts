import { useContext } from "react";

import { AppContext, type AppContextType } from "./AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
