"use client";

import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  return (
    <input
      onChange={(e) => router.push(`?query=${e.currentTarget.value}`)}
      type="text"
      placeholder="Search conversation by username.."
      className="flex-1 p-0 h-auto rounded-lg px-3 dark:bg-night-300 border dark:border-night-200"
    />
  );
}
