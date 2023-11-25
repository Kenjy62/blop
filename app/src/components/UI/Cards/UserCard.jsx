"use client";

// Required
import Link from "next/link";

// Components
import Picture from "../User/Picture";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function UserCard({ user }) {
  const colorScheme = CheckColorScheme();

  var color;
  var style;

  if (colorScheme === "royal-blue") {
    color = `p-2 rounded-lg dark:hover:bg-night-300 group`;
    style = `h-10 w-10 rounded-full object-cover group-hover:border-2 group-hover:border-royal-blue-400`;
  } else if (colorScheme === "Watermelon") {
    color = `p-2 rounded-lg dark:hover:bg-night-300 group`;
    style = `h-10 w-10 rounded-full object-cover group-hover:border-2 group-hover:border-watermelon-400`;
  } else if (colorScheme === "harlequin") {
    color = `p-2 rounded-lg dark:hover:bg-night-300 group`;
    style = `h-10 w-10 rounded-full object-cover group-hover:border-2 group-hover:border-harlequin-400`;
  } else if (colorScheme === "fire-bush") {
    color = `p-2 rounded-lg dark:hover:bg-night-300 group`;
    style = `h-10 w-10 rounded-full object-cover group-hover:border-2 group-hover:border-fire-bush-400`;
  } else if (colorScheme === "cinnabar") {
    color = `p-2 rounded-lg dark:hover:bg-night-300 group`;
    style = `h-10 w-10 rounded-full object-cover group-hover:border-2 group-hover:border-cinnabar-400`;
  } else if (colorScheme === "purple-heart") {
    color = `p-2 rounded-lg dark:hover:bg-night-300 group`;
    style = `h-10 w-10 rounded-full object-cover group-hover:border-2 group-hover:border-purple-heart-400`;
  }

  return (
    <Link href={`/User/${user.name}`} className={color}>
      <div key={user.id} className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center">
          <Picture
            url={user.picture}
            link={false}
            name={user.name}
            style={style}
          />
          <span>{user.name}</span>
        </div>
      </div>
    </Link>
  );
}
