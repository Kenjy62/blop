// Components
import Picture from "../../User/Picture";

// Required
import Link from "next/link";
import { useContext } from "react";

// Context
import { SearchContext } from "@/app/src/context/search";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function PostCardLittle({ post }) {
  const { toggle } = useContext(SearchContext);

  const colorScheme = CheckColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border dark:hover:border-watermelon-400 hover:border-watermelon-400 p-4 rounded-lg flex flex-col`;
  } else if (colorScheme === "cinnabar") {
    color = `cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border dark:hover:border-cinnabar-400 hover:border-cinnabar-400 p-4 rounded-lg flex flex-col`;
  } else if (colorScheme === "purple-heart") {
    color = `cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border dark:hover:border-purple-heart-400 hover:border-purple-heart-400 p-4 rounded-lg flex flex-col`;
  } else if (colorScheme === "harlequin") {
    color = `cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border dark:hover:border-harlequin-400 hover:border-harlequin-400 p-4 rounded-lg flex flex-col`;
  } else if (colorScheme === "royal-blue") {
    color = `cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border dark:hover:border-royal-blue-400 hover:border-royal-blue-400 p-4 rounded-lg flex flex-col`;
  } else if (colorScheme === "fire-bush") {
    color = `cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border dark:hover:border-fire-bush-400 hover:border-fire-bush-400 p-4 rounded-lg flex flex-col`;
  }

  return (
    <Link href={`/Post/${post.id}`} className="w-full h-fit">
      <div
        onClick={() => {
          toggle();
        }}
        className={color}
      >
        <div className="w-full flex flex-row gap-4 ">
          <Picture
            url={post.author.picture}
            name={post.author.name}
            link={false}
            style={`rounded-full h-14 w-14 object-cover`}
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full flex-row justify-between  h-fit">
              <span> {post.author.name}</span>
              <span className="text-sm">date</span>
            </div>
            <span className="text-sm">{post.content}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
