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

// Hooks
import useColorTheme from "@/app/src/hooks/useColorTheme";

export default function Items({ user, colorScheme, type }) {
  const pathname = usePathname();

  const colorTheme = useColorTheme()

  var color;
  var active;

  if (colorScheme === "Watermelon") {
    color = `p-2 rounded-full cursor-pointer hover:bg-watermelon-300`;
    active = `bg-watermelon-300 dark:bg-watermelon-300`;
  } else if (colorScheme === "harlequin") {
    color = `p-2 rounded-full cursor-pointer hover:bg-harlequin-300 `;
    active = `bg-harlequin-300 dark:bg-harlequin-300`;
  } else if (colorScheme === "royal-blue") {
    color = `p-2 rounded-full cursor-pointer hover:bg-royal-blue-300 `;
    active = `bg-royal-blue-300 dark:bg-royal-blue-300`;
  } else if (colorScheme === "fire-bush") {
    color = `p-2 rounded-full cursor-pointer hover:bg-fire-bush-300 `;
    active = `bg-fire-bush-300 dark:bg-fire-bush-300`;
  } else if (colorScheme === "cinnabar") {
    color = `p-2 rounded-full cursor-pointer hover:bg-cinnabar-300 `;
    active = `bg-cinnabar-300 dark:bg-cinnabar-300`;
  } else if (colorScheme === "purple-heart") {
    color = `p-2 rounded-full cursor-pointer hover:bg-purple-heart-300 `;
    active = `bg-purple-heart-300 dark:bg-purple-heart-300`;
  }

  const menuLinks = [
    {
      name: "Feed",
      path: "/Feed",
      icon: <RxHome color={type === 'Desktop' ? 'white' : colorTheme ? 'white' : 'black'} size={22} />,
      active:
        pathname === "/Feed" || pathname.includes("/Post/") ? true : false,
    },
    {
      name: "Notifications",
      path: "/Notification",
      icon: <RxBell color={type === 'Desktop' ? 'white' : colorTheme ? 'white' : 'black'} size={22} />,
      active: pathname === "/Notification" ? true : false,
    },
    {
      name: "Messages",
      path: "/Message",
      icon: <RxChatBubble color={type === 'Desktop' ? 'white' : colorTheme ? 'white' : 'black'} size={22} />,
      active: pathname === "/Message" || pathname.includes('/Message') ? true : false,
    },
    {
      name: "Bookmarks",
      path: `/Bookmark`,
      icon: <RxBookmark color={type === 'Desktop' ? 'white' : colorTheme ? 'white' : 'black'} size={22} />,
      active: pathname.includes("/Bookmark") ? true : false,
    },
    {
      name: "Profil",
      path: `/User/${user.name}`,
      icon: <RxPerson color={type === 'Desktop' ? 'white' : colorTheme ? 'white' : 'black'} size={22} />,
      active: pathname.includes("/User") || pathname.includes('/Edit') ? true : false,
    },
    {
      name: "Logout",
      path: "/Logout",
      icon: <RxExit color={type === 'Desktop' ? 'white' : colorTheme ? 'white' : 'black'} size={22} />,
      active: pathname === "/Logout" ? true : false,
    },
  ];

  return (
    <>
      {menuLinks.map((el, id) => {
        return (
          <Link key={id} href={el.path}>
            <div className={`${color} ${el.active && active}`}>{el.icon}</div>
          </Link>
        );
      })}
    </>
  );
}
