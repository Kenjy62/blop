// Required
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";

// Components
import Picture from "../../User/Picture";

// Context
import { SearchContext } from "@/app/src/context/search";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function UserCardBig({ user }) {
  const { toggle } = useContext(SearchContext);

  const colorScheme = CheckColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `w-48 h-44 border dark:border-night-200 hover:border-watermelon-400 dark:hover:border-watermelon-400 dark:bg-night-400 rounded-lg`;
  } else if (colorScheme === "purple-heart") {
    color = `w-48 h-44 border dark:border-night-200 hover:border-purple-heart-400 dark:hover:border-purple-heart-400 dark:bg-night-400 rounded-lg`;
  } else if (colorScheme === "cinnabar") {
    color = `w-48 h-44 border dark:border-night-200 hover:border-cinnabar-400 dark:hover:border-cinnabar-400 dark:bg-night-400 rounded-lg`;
  } else if (colorScheme === "harlequin") {
    color = `w-48 h-44 border dark:border-night-200 hover:border-harlequin-400 dark:hover:border-harlequin-400 dark:bg-night-400 rounded-lg`;
  } else if (colorScheme === "fire-bush") {
    color = `w-48 h-44 border dark:border-night-200 hover:border-fire-bush-400 dark:hover:border-fire-bush-400 dark:bg-night-400 rounded-lg`;
  } else if (colorScheme === "royal-blue") {
    color = `w-48 h-44 border dark:border-night-200 hover:border-royal-blue-400 dark:hover:border-royal-blue-400 dark:bg-night-400 rounded-lg`;
  }

  return (
    <Link href={`/User/${user.name}`} className="w-fit h-fit">
      <div
        className={color}
        onClick={() => {
          toggle();
        }}
      >
        <div>
          <Image
            src={user.cover}
            width={192}
            height={176}
            alt={`${user.name} cover`}
            className="rounded-t-lg"
          />
        </div>
        <div className="mt-[-32px] flex justify-center">
          <Picture
            url={user.picture}
            name={user.name}
            link={false}
            style={
              "rounded-full h-14 w-14 rounded-full object-cover border-2 dark:border-night-400 border-white"
            }
          />
        </div>
        <div className="flex justify-center">{user.name}</div>
      </div>
    </Link>
  );
}
