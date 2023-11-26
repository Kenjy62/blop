// Components
import Picture from "../../User/Picture";

// Required
import Link from "next/link";
import { useContext } from "react";

// Context
import { SearchContext } from "@/app/src/context/search";

export default function PostCardLittle({ post }) {
  const { toggle } = useContext(SearchContext);

  return (
    <Link href={`/Post/${post.id}`}>
      <div
        onClick={() => {
          toggle();
        }}
        className="cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border p-4 rounded-lg flex flex-col"
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
