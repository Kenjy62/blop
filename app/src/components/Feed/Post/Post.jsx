"use client";

// Required
import Link from "next/link";

// Components
import Actions from "./Action";
import Picture from "../../UI/User/Picture";
import Date from "../../UI/Globals/Date";
import Infos from "./Infos";
import Pictures from "./Pictures";
import Content from "./Content";

// Hooks
import { useColorScheme } from "@/app/src/hooks/useColorScheme";

export default function Post({ userId, post }) {
  const colorScheme = useColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `w-full p-4 pb-8 border-t border-b md:border md:rounded-lg flex flex-row gap-4 hover:border-watermelon-400 dark:border-night-300 dark:hover:border-watermelon-400`;
  } else if (colorScheme === "royal-blue") {
    color = `w-full p-4 pb-8 border-t border-b md:border md:rounded-lg flex flex-row gap-4 hover:border-royal-blue-400 dark:border-night-300 dark:hover:border-royal-blue-400`;
  } else if (colorScheme === "purple-heart") {
    color = `w-full p-4 pb-8 border-t border-b md:border md:rounded-lg flex flex-row gap-4 hover:border-purple-heart-400 dark:border-night-300 dark:hover:border-purple-heart-400`;
  } else if (colorScheme === "harlequin") {
    color = `w-full p-4 pb-8 border-t border-b md:border md:rounded-lg flex flex-row gap-4 hover:border-harlequin-400 dark:border-night-300 dark:hover:border-harlequin-400`;
  } else if (colorScheme === "cinnabar") {
    color = `w-full p-4 pb-8 border-t border-b md:border md:rounded-lg flex flex-row gap-4 hover:border-cinnabar-400 dark:border-night-300 dark:hover:border-cinnabar-400`;
  } else if (colorScheme === "fire-bush") {
    color = `w-full p-4 pb-8 border-t border-b md:border md:rounded-lg flex flex-row gap-4 hover:border-fire-bush-400 dark:border-night-300 dark:hover:border-fire-bush-400`;
  }

  return (
    <div>
      <div className={color}>
        <div className="h-fit w-16">
          <Picture
            name={post.author.name}
            url={post.author.picture}
            link={true}
            style="rounded-full h-14 w-14 object-cover"
          />
        </div>
        <div className="flex flex-col w-full gap-6">
          <Link
            href={`/Post/${post.id}`}
            className="w-full flex flex-col gap-2"
          >
            <div className="flex flex-row justify-between items-center">
              <Infos name={post.author.name} type={post.type} />
              <Date date={post.createdAt} />
            </div>
            <Content post={post} />
          </Link>
          {post.picture?.length > 0 && <Pictures post={post} />}
        </div>
      </div>
      <Actions userId={userId} post={post} />
    </div>
  );
}
