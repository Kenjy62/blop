// Required
import Image from "next/image";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Share({ post }) {
  return (
    <div className="w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-watermelon-200">
      <div className="h-fit">
        <div>
          <Image
            src={post.author.picture}
            height={100}
            width={100}
            className="rounded-full h-10 w-10"
            alt={`${post.author.name} avatar`}
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <span className="font-medium">{post.author.name}</span>
            <span className="font-light text-xs">
              {dayjs(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="font-normal">{post.content}</div>
        </div>
        {post.picture && (
          <Image
            className="w-full rounded-lg"
            src={post.picture}
            width={500}
            height={500}
          />
        )}
      </div>
    </div>
  );
}
