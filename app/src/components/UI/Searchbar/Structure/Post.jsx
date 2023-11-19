"use client";

// Required
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Image from "next/image";

// Context
import { SearchContext } from "@/app/src/context/search";

export default function Post({ post }) {
  const router = useRouter();
  const { toggle } = useContext(SearchContext);

  return (
    <div
      onClick={() => {
        toggle();
        router.push(`/Post/${post.id}`);
      }}
      className="cursor-pointer w-full dark:bg-night-400 dark:border-night-200 border p-4 rounded-lg flex flex-col"
    >
      <div className="w-full flex flex-row gap-4 ">
        <Image
          src={post.author.picture}
          height={64}
          width={64}
          className="rounded-full"
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
  );
}
