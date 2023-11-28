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
    color = `rounded-t-lg dark:bg-night-300 bg-watermelon-300 p-4 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "harlequin") {
    color = `rounded-t-lg dark:bg-night-300 bg-harlequin-300 p-4 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "royal-blue") {
    color = `rounded-t-lg dark:bg-night-300 bg-royal-blue-300 p-4 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "cinnabar") {
    color = `rounded-t-lg dark:bg-night-300 bg-cinnabar-300 p-4 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "purple-heart") {
    color = `rounded-t-lg dark:bg-night-300 bg-purple-heart-300 p-4 flex flex-row gap-4 items-center`;
  } else if (colorScheme === "fire-bush") {
    color = `rounded-t-lg dark:bg-night-300 bg-fire-bush-300 p-4 flex flex-row gap-4 items-center`;
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
