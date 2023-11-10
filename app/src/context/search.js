"use client";

import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [state, setState] = useState(false);
  const [query, setQuery] = useState();

  const toggle = async () => {
    setState(!state);
  };

  const startSearch = (data) => {
    setQuery(data);
  };

  return (
    <SearchContext.Provider value={{ state, toggle, query, startSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
