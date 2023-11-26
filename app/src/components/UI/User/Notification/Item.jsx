// Required
import Link from "next/link";

// Components
import Picture from "../Picture";

export default function Item({ item }) {
  return (
    <Link
      href={`/Message/Conversation/${
        item.type === "chat" ? item.Conversation.id : item.Post.id
      }`}
      className="flex flex-row w-full p-2 gap-2 items-center dark:hover:bg-night-200"
    >
      <Picture
        url={item.author.picture}
        style="h-8 w-8 rounded-full object-cover"
      />
      <div className="text-xs">{item.author.name} send a message</div>
    </Link>
  );
}
