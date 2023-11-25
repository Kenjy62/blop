"use client";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Hooks
import { CheckColorScheme } from "../../hooks/colorScheme";

export default function Sender({ data }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `bg-watermelon-500 dark:bg-watermelon-500 rounded-lg p-2`;
  } else if (colorScheme === "harlequin") {
    color = `bg-harlequin-500 dark:bg-harlequin-500 rounded-lg p-2`;
  } else if (colorScheme === "royal-blue") {
    color = `bg-royal-blue-500 dark:bg-royal-blue-500 rounded-lg p-2`;
  } else if (colorScheme === "fire-bush") {
    color = `bg-fire-bush-500 dark:bg-fire-bush-500 rounded-lg p-2`;
  } else if (colorScheme === "cinnabar") {
    color = `bg-cinnabar-500 dark:bg-cinnabar-500 rounded-lg p-2`;
  } else if (colorScheme === "purple-heart") {
    color = `bg-purple-heart-500 dark:bg-purple-heart-500 rounded-lg p-2`;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-start">
        <div className={color}>{data.content}</div>
      </div>
      <div className="flex flex-row justify-start">
        <span className="text-xs">{dayjs(data.createdAt).fromNow()}</span>
      </div>
    </div>
  );
}
