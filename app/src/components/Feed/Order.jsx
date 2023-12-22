"use client";

// Required
import { useRouter } from "next/navigation";

// Hooks
import { useColorScheme } from "../../hooks/useColorScheme";

export default function Order({ selected }) {
  const router = useRouter();

  const colorScheme = useColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `dark:bg-night-300 bg-watermelon-400 text-white rounded-lg p-2`;
  } else if (colorScheme === "harlequin") {
    color = `dark:bg-night-300 bg-harlequin-400 text-white rounded-lg p-2`;
  } else if (colorScheme === "purple-heart") {
    color = `dark:bg-night-300 bg-purple-heart-400 text-white rounded-lg p-2`;
  } else if (colorScheme === "cinnabar") {
    color = `dark:bg-night-300 bg-cinnabar-400 text-white rounded-lg p-2`;
  } else if (colorScheme === "fire-bush") {
    color = `dark:bg-night-300 bg-fire-bush-400 text-white rounded-lg p-2`;
  } else if (colorScheme === "royal-blue") {
    color = `dark:bg-night-300 bg-royal-blue-400 text-white rounded-lg p-2`;
  }

  return (
    <div className="flex justify-end dark:text-black">
      <select
        className={color}
        value={!selected ? "All" : selected}
        id="feedOrder"
        onChange={(e) => router.push(`?order=${e.currentTarget.value}`)}
      >
        <option value="All">All</option>
        <option value="Followed">Follow</option>
      </select>
    </div>
  );
}
