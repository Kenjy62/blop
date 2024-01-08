// Required
import Image from "next/image";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Picture from "../../UI/User/Picture";
dayjs.extend(relativeTime);

// Icons
import { RxClock } from "react-icons/rx";

// Hooks
import { useColorScheme } from "@/app/src/hooks/useColorScheme";

export default function Share({ post }) {
  const colorScheme = useColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-watermelon-400 dark:border-night-300 dark:hover:border-watermelon-400`;
  } else if (colorScheme === "royal-blue") {
    color = `w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-royal-blue-400 dark:border-night-300 dark:hover:border-royal-blue-400`;
  } else if (colorScheme === "purple-heart") {
    color = `w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-purple-heart-400 dark:border-night-300 dark:hover:border-purple-heart-400`;
  } else if (colorScheme === "harlequin") {
    color = `w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-harlequin-400 dark:border-night-300 dark:hover:border-harlequin-400`;
  } else if (colorScheme === "cinnabar") {
    color = `w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-cinnabar-400 dark:border-night-300 dark:hover:border-cinnabar-400`;
  } else if (colorScheme === "fire-bush") {
    color = `w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-fire-bush-400 dark:border-night-300 dark:hover:border-fire-bush-400`;
  }

  return (
    <div className={color}>
      <div className="h-fit">
        <div>
          <Picture
            url={post.author.picture}
            name={post.author.name}
            link={false}
            style="rounded-full h-10 w-10 cursor-pointer object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <span className="font-medium">{post.author.name}</span>
            <span className="font-light text-xs flex flex-row items-center gap-1">
              <RxClock /> {dayjs(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="font-normal">{post.content}</div>
        </div>
        {post.picture && post.picture.length > 0 && (
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
