"use client";

// Context
import { SearchContext } from "@/app/src/context/search";
import { useContext } from "react";

export default function Searchbar() {
  const { startSearch, toggle } = useContext(SearchContext);

  return (
    <input
      onChange={(e) => startSearch(e.currentTarget.value)}
      className="border px-2 py-1 rounded-lg w-[50%] outline-none focus:border focus:border-watermelon-200 dark:bg-night-300 dark:border-night-200"
      type="text"
      placeholder="Search everythings.."
    />
  );
}
