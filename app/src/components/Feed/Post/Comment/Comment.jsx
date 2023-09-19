// Required
import Image from "next/image";
import Link from "next/link";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Comment({ comment }) {
  return (
    <>
      <div className="w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-watermelon-200">
        <div className="h-fit">
          <Link href={`/User/${comment.author.name}`}>
            <Image
              src={comment.author.picture}
              height={40}
              width={40}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex flex-col w-full gap-6">
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <span className="font-medium">{comment.author.name}</span>
              <span className="font-light text-xs">
                {dayjs(comment.createdAt).fromNow()}
              </span>
            </div>
            <div className="font-normal">{comment.message}</div>
          </div>
        </div>
      </div>
    </>
  );
}
