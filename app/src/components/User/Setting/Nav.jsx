"use client";

// Required
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useContext } from "react";

// Context
import { ThemeContext } from "@/app/src/context/theme";

export default function Nav({ name }) {
  const pathname = usePathname();
  const { colorScheme } = useContext(ThemeContext);

  var color;

  if (colorScheme === "Watermelon") {
    color = `text-watermelon-400 dark:text-watermelon-400`;
  } else if (colorScheme === "royal-blue") {
    color = `text-royal-blue-400 dark:text-royal-blue-400`;
  } else if (colorScheme === "harlequin") {
    color = `text-harlequin-400 dark:text-harlequin-400`;
  } else if (colorScheme === "fire-bush") {
    color = `text-fire-bush-400 dark:text-fire-bush-400`;
  } else if (colorScheme === "cinnabar") {
    color = `text-cinnabar-400 dark:text-cinnabar-400`;
  } else if (colorScheme === "purple-heart") {
    color = `text-purple-heart-400 dark:text-purple-hearte-400`;
  }

  const nav = [
    {
      name: "Display",
      path: `/Edit/${name}`,
      isActive: pathname === `/Edit/${name}` ? true : false,
    },
    {
      name: "Notification",
      path: `/Edit/${name}/Notification`,
      isActive: pathname === `/Edit/${name}/Notification` ? true : false,
    },
    {
      name: "Security",
      path: `/Edit/${name}/Security`,
      isActive: pathname === `/Edit/${name}/Security` ? true : false,
    },
    {
      name: "Confidentiality",
      path: `/Edit/${name}/Confidentiality`,
      isActive: pathname === `/Edit/${name}/Confidentiality` ? true : false,
    },
  ];

  return nav.map((item) => {
    return (
      <Link key={item.name} href={item.path}>
        <div className={item.isActive ? color : null}>{item.name}</div>
      </Link>
    );
  });
}
