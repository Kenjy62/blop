"use client";

import { CheckColorScheme } from "../../hooks/colorScheme";

export const TriangleTop = () => {
  const colorScheme = CheckColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `w-0 h-0 border-l-[5px] border-l-transparent border-b-[5px] border-b-watermelon-300 border-r-[5px] border-r-transparent`;
  } else if (colorScheme === "cinnabar") {
    color = `w-0 h-0 border-l-[5px] border-l-transparent border-b-[5px] border-b-cinnabar-300 border-r-[5px] border-r-transparent`;
  } else if (colorScheme === "royal-blue") {
    color = `w-0 h-0 border-l-[5px] border-l-transparent border-b-[5px] border-b-royal-blue-300 border-r-[5px] border-r-transparent`;
  } else if (colorScheme === "purple-heart") {
    color = `w-0 h-0 border-l-[5px] border-l-transparent border-b-[5px] border-b-purple-heart-300 border-r-[5px] border-r-transparent`;
  } else if (colorScheme === "harlequin") {
    color = `w-0 h-0 border-l-[5px] border-l-transparent border-b-[5px] border-b-harlequin-300 border-r-[5px] border-r-transparent`;
  } else if (colorScheme === "fire-bush") {
    color = `w-0 h-0 border-l-[5px] border-l-transparent border-b-[5px] border-b-fire-bush-300 border-r-[5px] border-r-transparent`;
  }

  return (
    <div className="flex justify-end">
      <div className={color}></div>
    </div>
  );
};
