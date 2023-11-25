"use client";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function Button({ children }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `py-2 px-4 h-fit bg-watermelon-400 dark:bg-watermelon-400 text-white rounded-lg w-fit hover:bg-watermelon-400 cursor-pointer`;
  } else if (colorScheme === "harlequin") {
    color = `py-2 px-4 h-fit bg-harlequin-400 dark:bg-harlequin-400 text-white rounded-lg w-fit hover:bg-harlequin-400 cursor-pointer`;
  } else if (colorScheme === "royal-blue") {
    color = `py-2 px-4 h-fit bg-royal-blue-400 dark:bg-royal-blue-400 text-white rounded-lg w-fit hover:bg-royal-blue-400 cursor-pointer`;
  } else if (colorScheme === "purple-heart") {
    color = `py-2 px-4 h-fit bg-purple-heart-400 dark:bg-purple-heart-400 text-white rounded-lg w-fit hover:bg-purple-heart-400 cursor-pointer`;
  } else if (colorScheme === "cinnabar") {
    color = `py-2 px-4 h-fit bg-cinnabar-400 dark:bg-cinnabar-400 text-white rounded-lg w-fit hover:bg-cinnabar-400 cursor-pointer`;
  } else if (colorScheme === "fire-bush") {
    color = `py-2 px-4 h-fit bg-fire-bush-400 dark:bg-fire-bush-400 text-white rounded-lg w-fit hover:bg-fire-bush-400 cursor-pointer`;
  }

  return <div className={color}>{children}</div>;
}
