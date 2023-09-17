// Required
import Image from "next/image";
import Link from "next/link";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Post({ post }) {
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
      <Link
        href={`/Feed/Post/${post.id}`}
        className="w-full flex flex-col gap-2"
      >
        <div className="flex flex-row justify-between">
          <span>{post.author.name}</span>
          <span>{dayjs(post.createdAt).fromNow()}</span>
        </div>
        <div>{post.content}</div>
      </Link>
    </div>
  );
}
