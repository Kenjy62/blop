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

export default function Item({ item }) {
  const onHover = async (id) => {
    await setIsRead(id);
  };

  return (
    <Link href="#">
      <div
        onMouseEnter={() => item.isRead === 0 && onHover(item.id)}
        key={item.id}
        className="flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-watermelon-100 hover:rounded-lg border-b dark:border-night-200"
      >
        <Picture
          url={item.author.picture}
          name={item.author.name}
          link={false}
          style="rounded-full h-10 w-10 cursor-pointer object-cover"
        />
        <span className="w-fit">
          {item.author.name} has {item.type} your post{" "}
          {dayjs(item.createdAt).fromNow()}
        </span>
        {item.isRead === 0 && (
          <div className="flex flex-1 justify-end align-top">
            <Tag state={"Active"}>New</Tag>
          </div>
        )}
      </div>
    </Link>
  );
}
