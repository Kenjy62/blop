"use client";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export function ToastError({ message }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 border-l-2 shadow-lg border-watermelon-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "royal-blue") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 border-l-2 shadow-lg border-royal-blue-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "harlequin") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 border-l-2 shadow-lg border-harlequin-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "fire-bush") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 border-l-2 shadow-lg border-fire-bush-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "cinnabar") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 border-l-2 shadow-lg border-cinnabar-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "purple-heart") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 border-l-2 shadow-lg border-purple-heart-400 flex flex-row gap-4 items-center`;
  }

  return (
    <div className={color}>
      <div>⛔</div>
      <div>{message}</div>
    </div>
  );
}

export function ToastSuccess({ message }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 shadow-lg border-l-2 border-watermelon-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "royal-blue") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 shadow-lg border-l-2 border-royal-blue-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "harlequin") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 shadow-lg border-l-2 border-harlequin-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "fire-bush") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 shadow-lg border-l-2 border-fire-bush-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "cinnabar") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 shadow-lg border-l-2 border-cinnabar-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "purple-heart") {
    color = `bg-light-100 dark:bg-night-400 text-black dark:text-white p-4 shadow-lg border-l-2 border-purple-heart-400 flex flex-row gap-4 items-center`;
  }

  return (
    <div className={color}>
      <div>✅</div>
      <div>{message}</div>
    </div>
  );
}
