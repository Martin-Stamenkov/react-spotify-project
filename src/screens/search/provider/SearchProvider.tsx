import { getResultFromSearch } from "api/requests";
import React, { createContext, useMemo, useState, useContext, useCallback } from "react";

const SearchContext: any = createContext(null);

export const SearchProvider: React.FC<{}> = ({ children }) => {
  const [result, setResult] = useState(null);

  const searchForAnItem = useCallback(async (query: string) => {
    const response = await getResultFromSearch(query);
    setResult(response);
  }, []);

  const value = useMemo(
    () => ({
      searchForAnItem,
      result,
      setResult,
    }),
    [searchForAnItem, result, setResult]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export function useSearch() {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error('SearchContext must be in scope when using "useSearch"');
  }

  return searchContext;
}
