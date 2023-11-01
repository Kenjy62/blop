"use client";

// Required
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  RxHome,
  RxBell,
  RxChatBubble,
  RxPerson,
  RxExit,
  RxBookmark,
} from "react-icons/rx";

export default function Items({ user }) {
  const pathname = usePathname();

  const menuLinks = [
    {
      name: "Feed",
      path: "/Feed",
      icon: <RxHome color="white" size={22} />,
      active:
        pathname === "/Feed" || pathname.includes("/Post/") ? true : false,
    },
    {
      name: "Notifications",
      path: "/Notification",
      icon: <RxBell color="white" size={22} />,
      active: pathname === "/Notification" ? true : false,
    },
    {
      name: "Messages",
      path: "/Message",
      icon: <RxChatBubble color="white" size={22} />,
      active: pathname === "/Message" ? true : false,
    },
    {
      name: "Bookmarks",
      path: `/Bookmark`,
      icon: <RxBookmark color="white" size={22} />,
      active: pathname.includes("/Bookmark") ? true : false,
    },
    {
      name: "Profil",
      path: `/User/${user.name}`,
      icon: <RxPerson color="white" size={22} />,
      active: pathname.includes("/User") ? true : false,
    },
    {
      name: "Logout",
      path: "/Logout",
      icon: <RxExit color="white" size={22} />,
      active: pathname === "/Logout" ? true : false,
    },
  ];

  return (
    <>
      {menuLinks.map((el, id) => {
        return (
          <Link key={id} href={el.path}>
            <div
              className={`p-2 rounded-full cursor-pointer ${
                el.active ? "bg-watermelon-500" : null
              }`}
            >
              {el.icon}
            </div>
          </Link>
        );
      })}
    </>
  );
}
