"use client";

// Required
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { CheckColorScheme } from "../../hooks/colorScheme";

export default function Tabs() {
  const pathname = usePathname();
  const { name } = useParams();

  const colorScheme = CheckColorScheme();

  var activeColor;
  var unactiveColor;

  if (colorScheme === "Watermelon") {
    activeColor = `border-b-2 border-b-watermelon-400 dark:border-b-watermeon-400  p-4`;
    unactiveColor = `hover:border-b-2 hover:border-b-watermelon-400 p-4`;
  } else if (colorScheme === "harlequin") {
    activeColor = `border-b-2 border-b-harlequin-400 dark:border-b-watermeon-400  p-4`;
    unactiveColor = `hover:border-b-2 hover:border-b-harlequin-400 p-4`;
  } else if (colorScheme === "royal-blue") {
    activeColor = `border-b-2 border-b-royal-blue-400 dark:border-b-watermeon-400 p-4`;
    unactiveColor = `hover:border-b-2 hover:border-b-royal-blue-400 p-4`;
  } else if (colorScheme === "fire-bush") {
    activeColor = `border-b-2 border-b-fire-bush-400 dark:border-b-watermeon-400 p-4`;
    unactiveColor = `hover:border-b-2 hover:border-b-fire-bush-400 p-4`;
  } else if (colorScheme === "cinnabar") {
    activeColor = `border-b-2 border-b-cinnabar-400 dark:border-b-watermeon-400 p-4`;
    unactiveColor = `hover:border-b-2 hover:border-b-cinnabar-400 p-4`;
  } else if (colorScheme === "purple-heart") {
    activeColor = `border-b-2 border-b-purple-heart-400 dark:border-b-watermeon-400 p-4`;
    unactiveColor = `hover:border-b-2 hover:border-b-purple-heart-400 p-4`;
  }

  const Links = [
    {
      id: 0,
      name: "Post",
      link: `/User/${name}`,
      active: pathname === `/User/${name}` ? true : false,
    },
    {
      id: 0,
      name: "Repost",
      link: `/User/${name}/Repost`,
      active: pathname === `/User/${name}/Repost` ? true : false,
    },
    {
      id: 0,
      name: "Likes",
      link: `/User/${name}/Likes`,
      active: pathname === `/User/${name}/Likes` ? true : false,
    },
    {
      id: 0,
      name: "Medias",
      link: `/User/${name}/Medias`,
      active: pathname === `/User/${name}/Medias` ? true : false,
    },
    {
      id: 0,
      name: "Follows",
      link: `/User/${name}/Follows`,
      active: pathname === `/User/${name}/Follows` ? true : false,
    },
    {
      id: 0,
      name: "Followers",
      link: `/User/${name}/Followers`,
      active: pathname === `/User/${name}/Followers` ? true : false,
    },
  ];

  return (
    <div className="flex flex-row gap-4 border-t border-b dark:border-night-200">
      {Links.map((link, id) => {
        return (
          <Link
            key={id}
            className={`${link.active && activeColor} ${unactiveColor}`}
            href={link.link}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
