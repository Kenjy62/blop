"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs() {
  const pathname = usePathname();

  const Links = [
    {
      id: 0,
      name: "Post",
      link: "/Feed/User/Kaneki",
      active: pathname === "/Feed/User/Kaneki" ? true : false,
    },
    {
      id: 0,
      name: "Repost",
      link: "/Feed/User/Kaneki/Repost",
      active: pathname === "/Feed/User/Kaneki/Repost" ? true : false,
    },
    {
      id: 0,
      name: "Likes",
      link: "/Feed/User/Kaneki/Likes",
      active: pathname === "/Feed/User/Kaneki/Likes" ? true : false,
    },
    {
      id: 0,
      name: "Medias",
      link: "/Feed/User/Medias",
      active: pathname === "/Feed/User/Medias" ? true : false,
    },
  ];

  return (
    <div className="flex flex-row gap-4 border-t border-b">
      {Links.map((link) => {
        return (
          <Link
            className={`p-4 ${
              link.active && `border-b-2 border-b-watermelon-500`
            } hover:border-b-2 hover:border-b-watermelon-500`}
            href={link.link}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
