// Required
import Image from "next/image";
import Link from "next/link";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Icons
import { RxBookmark, RxChatBubble, RxHeart } from "react-icons/rx";

export default function Post({ post, params, searchParams }) {
  return (
    <div className="w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-watermelon-200">
      <div className="h-fit">
        <Link href={`/User/${post.author.name}`}>
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
            <span className="font-medium">{post.author.name}</span>
            <span className="font-light text-xs">
              {dayjs(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="font-normal">{post.content}</div>
        </Link>
        {post.picture && (
          <Image
            className="w-full rounded-lg"
            src={post.picture}
            width={500}
            height={500}
          />
        )}
        <div className="flex flex-row gap-6">
          <Link href={`/Feed/?comment=${post.id}`} scroll={false}>
            <span className="flex flex-row gap-2 items-center cursor-pointer">
              {post.Comment.length} <RxChatBubble />
            </span>
          </Link>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            {post.likes} <RxHeart />
          </span>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            {post.bookmarks} <RxBookmark />
          </span>
        </div>
      </div>
    </div>
  );
}
