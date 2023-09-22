"use client";

// Required
import Image from "next/image";
import Link from "next/link";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Components
import Share from "./Share/Share";
import Actions from "./Action";
import { RxClock } from "react-icons/rx";

export default function Post({ post }) {
  return (
    <div className="w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-watermelon-200">
      <div className="h-fit">
        <Link href={`/Feed/User/${post.author.name}`}>
          <Image
            src={post.author.picture}
            height={40}
            width={40}
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="flex flex-col w-full gap-6">
        <Link
          href={`/Feed/Post/${post.id}`}
          className="w-full flex flex-col gap-2"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <span className="font-medium">{post.author.name} </span>
              <span className="text-sm">
                {post.type === "post" ? "has posted" : "has shared"}
              </span>
            </div>
            <span className="font-light text-xs flex flex-row items-center gap-1">
              <RxClock /> {dayjs(post.createdAt).fromNow()}
            </span>
          </div>
          {post.type === "post" ? (
            <div className="font-normal">{post.content}</div>
          ) : (
            <>
              <div className="font-normal">{post.content}</div>
              <Share post={post.reblopData} />
            </>
          )}
        </Link>
        {post.picture && (
          <Image
            className="w-full rounded-lg"
            src={post.picture}
            width={500}
            height={500}
          />
        )}
        <Actions
          postId={post.id}
          comments={post.Comment}
          likes={post.likes}
          shares={post.reblops}
          bookmarks={post.bookmarks}
          UsersLikes={post.UsersLikes}
        />
      </div>
    </div>
  );
}
