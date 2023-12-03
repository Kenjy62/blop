// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Required
import Link from "next/link";

// Components
import Picture from "../Picture";

export default function Item({ item }) {
  return (
    <Link
      href={
        item.type === "chat"
          ? `/Conversation/${item.Conversation.id}`
          : `/Post/${item.Post.id}`
      }
      className="flex flex-row w-full p-2 gap-2 items-center dark:hover:bg-night-200"
    >
      <Picture
        url={item.author.picture}
        style="h-8 w-8 rounded-full object-cover"
      />
      <div className="flex flex-col gap-1">
        <span className="text-xs">
          {item.type === "like" && `${item.author.name} like you'r post`}
          {item.type === "share" && `${item.author.name} share you'r post`}
          {item.type === "comment" && `${item.author.name} comment you'r post`}
          {item.type === "chat" && `${item.author.name} send you a message`}
        </span>
        <span className="text-xs">{dayjs(item.createdAt).fromNow()}</span>
      </div>
    </Link>
  );
}
