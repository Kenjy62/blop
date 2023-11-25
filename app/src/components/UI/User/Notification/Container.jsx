import Link from "next/link";
import Picture from "../Picture";

export default function Container({ data, type }) {
  if (type === "Chat") {
    const filteredData = data.filter(
      (item) => item.type === "chat" && item.isRead === 0
    );

    console.log(filteredData);

    if (filteredData.length > 0) {
      return (
        <div className="w-48 h-52 dark:bg-night-300 rounded-tr-none rounded-lg overflow-y-scroll py-2">
          {filteredData.map((item, id) => (
            <Link
              key={id}
              href={`/Message/Conversation/${item.Conversation.id}`}
              className="flex flex-row w-full p-2 gap-2 items-center dark:hover:bg-night-200"
            >
              <Picture
                url={item.author.picture}
                style="h-8 w-8 rounded-full object-cover"
              />
              <div className="text-xs">{item.author.name} send a message</div>
            </Link>
          ))}
        </div>
      );
    }

    if (filteredData.length < 1) {
      return (
        <div className="dark:bg-night-300 rounded-tr-none rounded-lg overflow-y-scroll py-2">
          No chat notification for this moment
        </div>
      );
    }
  }

  if (type === "Notification") {
    const filteredData = data.filter((item) => item.type !== "chat");

    if (filteredData.length > 0) {
      return (
        <div className="w-48 h-52 dark:bg-night-300 rounded-tr-none rounded-lg overflow-y-scroll py-2">
          {filteredData.map((item) => (
            <Link
              href={`/Post/${item.Post.id}`}
              className="flex flex-row w-full p-2 gap-2 items-center dark:hover:bg-night-200"
            >
              <Picture
                url={item.author.picture}
                style="h-8 w-8 rounded-full object-cover"
              />
              <div className="text-xs">
                {item.author.name} has {item.type} you'r post
              </div>
            </Link>
          ))}
        </div>
      );
    }

    if (filteredData.length < 1) {
      return (
        <div className="dark:bg-night-300 rounded-tr-none rounded-lg overflow-y-scroll py-2">
          <span className="p-2">No notification for this moment</span>
        </div>
      );
    }
  }
}
