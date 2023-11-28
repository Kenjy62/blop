"use client";

// Required
import { useContext } from "react";

// Context
import { SearchContext } from "@/app/src/context/search";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function Searchbar() {
  const { startSearch } = useContext(SearchContext);

  const colorScheme = CheckColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `border px-2 py-1 rounded-lg w-[50%] outline-none focus:border focus:border-watermelon-400 dark:focus:border-watermelon-400 dark:bg-night-300 dark:border-night-200`;
  } else if (colorScheme === "purple-heart") {
    color = `border px-2 py-1 rounded-lg w-[50%] outline-none focus:border focus:border-purple-heart-400 dark:focus:border-purple-heart-400 dark:bg-night-300 dark:border-night-200`;
  } else if (colorScheme === "cinnabar") {
    color = `border px-2 py-1 rounded-lg w-[50%] outline-none focus:border focus:border-cinnabar-400 dark:focus:border-cinnabar-400 dark:bg-night-300 dark:border-night-200`;
  } else if (colorScheme === "harlequin") {
    color = `border px-2 py-1 rounded-lg w-[50%] outline-none focus:border focus:border-harlequin-400 dark:focus:border-harlequin-400 dark:bg-night-300 dark:border-night-200`;
  } else if (colorScheme === "fire-bush") {
    color = `border px-2 py-1 rounded-lg w-[50%] outline-none focus:border focus:border-fire-bush-400 dark:focus:border-fire-bush-400 dark:bg-night-300 dark:border-night-200`;
  } else if (colorScheme === "royal-blue") {
    color = `border px-2 py-1 rounded-lg w-[50%] outline-none focus:border focus:border-royal-blue-400 dark:focus:border-royal-blue-400 dark:bg-night-300 dark:border-night-200`;
  }

  return (
    <input
      onChange={(e) => startSearch(e.currentTarget.value)}
      className={color}
      type="text"
      placeholder="Search user and post.."
    />
  );
}
