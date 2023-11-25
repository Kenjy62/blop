"use client";

// Hooks
import { CheckColorScheme } from "../../hooks/colorScheme";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Receiver({ data }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `bg-watermelon-400 dark:bg-watermelon-400 rounded-lg p-2`;
  } else if (colorScheme === "harlequin") {
    color = `bg-harlequin-400 dark:bg-harlequin-400 rounded-lg p-2`;
  } else if (colorScheme === "royal-blue") {
    color = `bg-royal-blue-400 dark:bg-royal-blue-400 rounded-lg p-2`;
  } else if (colorScheme === "fire-bush") {
    color = `bg-fire-bush-400 dark:bg-fire-bush-400 rounded-lg p-2`;
  } else if (colorScheme === "cinnabar") {
    color = `bg-cinnabar-400 dark:bg-cinnabar-400 rounded-lg p-2`;
  } else if (colorScheme === "purple-heart") {
    color = `bg-purple-heart-400 dark:bg-purple-heart-400 rounded-lg p-2`;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-end">
        <div className={color}>{data.content}</div>
      </div>
      <div className="flex flex-row justify-end">
        <span className="text-xs">{dayjs(data.createdAt).fromNow()}</span>
      </div>
    </div>
  );
}
