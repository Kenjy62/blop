"use client";

// Hooks
import { CheckColorScheme } from "../../../hooks/colorScheme";

// Components
import Date from "../../UI/Globals/Date";

export default function Sender({ data }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `bg-watermelon-500 dark:bg-watermelon-500 rounded-lg p-2 text-white`;
  } else if (colorScheme === "harlequin") {
    color = `bg-harlequin-500 dark:bg-harlequin-500 rounded-lg p-2 text-white`;
  } else if (colorScheme === "royal-blue") {
    color = `bg-royal-blue-500 dark:bg-royal-blue-500 rounded-lg p-2 text-white`;
  } else if (colorScheme === "fire-bush") {
    color = `bg-fire-bush-500 dark:bg-fire-bush-500 rounded-lg p-2 text-white`;
  } else if (colorScheme === "cinnabar") {
    color = `bg-cinnabar-500 dark:bg-cinnabar-500 rounded-lg p-2 text-white`;
  } else if (colorScheme === "purple-heart") {
    color = `bg-purple-heart-500 dark:bg-purple-heart-500 rounded-lg p-2 text-white`;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-start">
        <div className={color}>{data.content}</div>
      </div>
      <div className="flex flex-row justify-start">
        <Date date={data.createdAt} />
      </div>
    </div>
  );
}
