"use client";

// Components
import Picture from "../../UI/User/Picture";
import Title from "../../UI/Title/Title";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function ChatTop({ picture, name }) {
  const colorScheme = CheckColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `rounded-t-lg dark:bg-night-300 bg-watermelon-400 p-4 flex flex-row gap-4 items-center border border-watermelon-300`;
  } else if (colorScheme === "harlequin") {
    color = `rounded-t-lg dark:bg-night-300 bg-harlequin-400 p-4 flex flex-row gap-4 items-center border border-harlequin-300`;
  } else if (colorScheme === "royal-blue") {
    color = `rounded-t-lg dark:bg-night-300 bg-royal-blue-400 p-4 flex flex-row gap-4 items-center border border-royal-blue-300`;
  } else if (colorScheme === "cinnabar") {
    color = `rounded-t-lg dark:bg-night-300 bg-cinnabar-400 p-4 flex flex-row gap-4 items-center border border-cinnabar-300`;
  } else if (colorScheme === "purple-heart") {
    color = `rounded-t-lg dark:bg-night-300 bg-purple-heart-400 p-4 flex flex-row gap-4 items-center border border-purple-heart-300`;
  } else if (colorScheme === "fire-bush") {
    color = `rounded-t-lg dark:bg-night-300 bg-fire-bush-400 p-4 flex flex-row gap-4 items-center border border-fire-bush-300`;
  }

  return (
    <div className={color}>
      <Picture
        name={name}
        url={picture}
        style={"h-14 w-14 rounded-full object-cover"}
        link={true}
      />
      <Title>{name}</Title>
    </div>
  );
}
