import { getResultFromSearch } from "api/requests";
import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";

const SearchContext: any = createContext(null);

export const SearchProvider: React.FC<{}> = ({ children }) => {
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");

  const searchForAnItem = useCallback(
    async (query: string, limit: number, offset: number) => {
      const response = await getResultFromSearch(query, limit, offset);
      setResult(response);
      setQuery(query);
    },
    []
  );
  
  const value = useMemo(
    () => ({
      searchForAnItem,
      result,
      setResult,
      query,
      setQuery,
    }),
    [searchForAnItem, result, setResult, query, setQuery]
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
