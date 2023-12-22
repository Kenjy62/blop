"use client";

// required
import { useRouter } from "next/navigation";

// Hooks
import { useColorScheme } from "../../hooks/useColorScheme";

export default function SearchBar() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `flex-1 p-0 h-auto rounded-lg px-3 dark:bg-night-300 border dark:border-night-200 focus:border-watermelon-400 dark:focus:border-watermelon-400 outline-none`;
  } else if (colorScheme === "cinnabar") {
    color = `flex-1 p-0 h-auto rounded-lg px-3 dark:bg-night-300 border dark:border-night-200 focus:border-cinnabar-400 dark:focus:border-cinnabar-400 outline-none`;
  } else if (colorScheme === "harlequin") {
    color = `flex-1 p-0 h-auto rounded-lg px-3 dark:bg-night-300 border dark:border-night-200 focus:border-harlequin-400 dark:focus:border-harlequin-400 outline-none`;
  } else if (colorScheme === "purple-heart") {
    color = `flex-1 p-0 h-auto rounded-lg px-3 dark:bg-night-300 border dark:border-night-200 focus:border-purple-heart-400 dark:focus:border-purple-heart-400 outline-none`;
  } else if (colorScheme === "royal-blue") {
    color = `flex-1 p-0 h-auto rounded-lg px-3 dark:bg-night-300 border dark:border-night-200 focus:border-royal-blue-400 dark:focus:border-royal-blue-400 outline-none`;
  } else if (colorScheme === "fire-bush") {
    color = `flex-1 p-0 h-auto rounded-lg px-3 dark:bg-night-300 border dark:border-night-200 focus:border-fire-bush-400 dark:focus:border-fire-bush-400 outline-none`;
  }

  return (
    <input
      onChange={(e) => router.push(`?query=${e.currentTarget.value}`)}
      type="text"
      placeholder="Search conversation by username.."
      className={color}
    />
  );
}
