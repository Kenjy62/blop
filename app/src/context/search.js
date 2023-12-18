"use client";

import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [state, setState] = useState(false);
  const [query, setQuery] = useState();

  const toggle = async () => {
    setState(!state);
  };

  const startSearch = (data) => {
    if (data.length > 3) {
      if (!state) {
        setState(!state);
      }

      setQuery(data.replace("#", ""));
    } else if (data.length < 1 && state) {
      setState(!state);
    }
  };

  return (
    <SearchContext.Provider
      value={{ state, toggle, query, startSearch, setQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};
