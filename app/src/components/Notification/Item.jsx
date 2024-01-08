// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Required
import Link from "next/link";

// Components
import Picture from "../UI/User/Picture";
import Tag from "../UI/Tag/Tag";

// Features
import { setIsRead } from "../../features/notification";

// Hooks
import { useColorScheme } from "../../hooks/useColorScheme";
import Date from "../UI/Globals/Date";

export default function Item({ item }) {
  const colorScheme = useColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-watermelon-100 hover:rounded-lg border-b dark:border-night-200`;
  } else if (colorScheme === "harlequin") {
    color = `flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-harlequin-100 hover:rounded-lg border-b dark:border-night-200`;
  } else if (colorScheme === "fire-bush") {
    color = `flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-fire-bush-100 hover:rounded-lg border-b dark:border-night-200`;
  } else if (colorScheme === "cinnabar") {
    color = `flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-cinnabar-100 hover:rounded-lg border-b dark:border-night-200`;
  } else if (colorScheme === "purple-heart") {
    color = `flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-purple-heart-100 hover:rounded-lg border-b dark:border-night-200`;
  } else if (colorScheme === "royal-blue") {
    color = `flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-royal-blue-100 hover:rounded-lg border-b dark:border-night-200`;
  }

  const onHover = async (id) => {
    await setIsRead(id);
  };

  if (
    item.type === "like" ||
    item.type === "comment" ||
    item.type === "share"
  ) {
    return (
      <Link href={`Post/${item.Post.id}`}>
        <div
          onMouseEnter={() => item.isRead === 0 && onHover(item.id)}
          key={item.id}
          className={color}
        >
          <Picture
            url={item.author.picture}
            name={item.author.name}
            link={false}
            style="rounded-full h-10 w-10 cursor-pointer object-cover"
          />
          <span className="w-fit text-sm md:text-base">
            {item.author.name} has {item.type} your post <Date date={item.createdAt} />
          </span>
          {item.isRead === 0 && (
            <div className="flex flex-1 justify-end align-top">
              <Tag state={"Active"}>New</Tag>
            </div>
          )}
        </div>
      </Link>
    );
  } else if (item.type === "chat") {
    return (
      <Link href={`Message/Conversation/${item.Conversation.id}`}>
        <div
          onMouseEnter={() => item.isRead === 0 && onHover(item.id)}
          key={item.id}
          className={color}
        >
          <Picture
            url={item.author.picture}
            name={item.author.name}
            link={false}
            style="rounded-full h-10 w-10 cursor-pointer object-cover"
          />
          <span className="w-fit text-sm">
            {item.author.name} send {item.type}
          </span>
          <span>-</span>
          <Date date={item.createdAt} />
          {item.isRead === 0 && (
            <div className="flex flex-1 justify-end align-top">
              <Tag state={"Active"}>New</Tag>
            </div>
          )}
        </div>
      </Link>
    );
  }
}
