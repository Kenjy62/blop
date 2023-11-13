"use client";

// Required
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav({ name }) {
  const pathname = usePathname();

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
  ];

  return nav.map((item) => {
    return (
      <Link
        key={item.name}
        href={item.path}
        className={
          item.isActive
            ? "text-watermelon-400 dark:text-white"
            : "text-black dark:text-night-200"
        }
      >
        <div
          className={
            item.isActive
              ? "text-watermelon-400 dark:text-night-200"
              : "text-black dark:text-white"
          }
        >
          {item.name}
        </div>
      </Link>
    );
  });
}
