"use client";

// Required
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Tabs() {
  const pathname = usePathname();
  const { name } = useParams();

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
  ];

  return (
    <div className="flex flex-row gap-4 border-t border-b dark:border-night-200">
      {Links.map((link, id) => {
        return (
          <Link
            key={id}
            className={`p-4 ${
              link.active &&
              `border-b-2 border-b-watermelon-500 dark:border-b-night-200`
            } hover:border-b-2 hover:border-b-watermelon-500 hover:dark:border-b-night-200`}
            href={link.link}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
