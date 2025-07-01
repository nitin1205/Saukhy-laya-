import { useContext } from "react";

import { SearchContext, type SearchContextType } from "./SearchContext";

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContextType;
};
