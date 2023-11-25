"use client";

import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function Tag({ children, state }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `${
      state === "Active"
        ? "bg-waterlon-400 dark:bg-watermelon-400"
        : "bg-transparent"
    } text-white rounded-lg px-3 py-1 cursor-pointer hover:bg-watermelon-400`;
  } else if (colorScheme === "harlequin") {
    color = `${
      state === "Active"
        ? "bg-harlequin-400 dark:bg-harlequin-400"
        : "bg-transparent"
    } text-white rounded-lg px-3 py-1 cursor-pointer hover:bg-harlequin-400`;
  } else if (colorScheme === "purple-heart") {
    color = `${
      state === "Active"
        ? "bg-purple-heart-400 dark:bg-purple-heart-400"
        : "bg-transparent"
    } text-white rounded-lg px-3 py-1 cursor-pointer hover:bg-purple-heart-400`;
  } else if (colorScheme === "fire-bush") {
    color = `${
      state === "Active"
        ? "bg-fire-bush-400 dark:bg-fire-bush-400"
        : "bg-transparent"
    } text-white rounded-lg px-3 py-1 cursor-pointer hover:bg-fire-bush-400`;
  } else if (colorScheme === "cinnabar") {
    color = `${
      state === "Active"
        ? "bg-cinnabar-400 dark:bg-cinnabar-400"
        : "bg-transparent"
    } text-white rounded-lg px-3 py-1 cursor-pointer hover:bg-cinnabar-400`;
  } else if (colorScheme === "royal-blue") {
    color = `${
      state === "Active"
        ? "bg-royal-blue-400 dark:bg-royal-blue-400"
        : "bg-transparent"
    } text-white rounded-lg px-3 py-1 cursor-pointer hover:bg-royal-blue-400`;
  }

  return <div className={color}>{children}</div>;
}
