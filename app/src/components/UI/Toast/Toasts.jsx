"use client";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export function ToastError({ message }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-watermelon-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "royal-blue") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-royal-blue-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "harlequin") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-harlequin-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "fire-bush") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-fire-bush-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "cinnabar") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-cinnabar-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "purple-heart") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-purple-heart-400 flex flex-row gap-4 items-center`;
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
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-watermelon-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "royal-blue") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-royal-blue-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "harlequin") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-harlequin-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "fire-bush") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-fire-bush-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "cinnabar") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-cinnabar-400 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "purple-heart") {
    color = `bg-white dark:bg-night-400 text-black dark:text-white p-4 rounded-lg border border-purple-heart-400 flex flex-row gap-4 items-center`;
  }

  return (
    <div className={color}>
      <div>✅</div>
      <div>{message}</div>
    </div>
  );
}
