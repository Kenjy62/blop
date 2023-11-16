"use client";

// Required
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Context
import { SearchContext } from "@/app/src/context/search";

export default function User({ user }) {
  const { toggle } = useContext(SearchContext);
  const router = useRouter();

  return (
    <div
      className="w-48 h-44 bg-watermelon-400 dark:bg-night-400 rounded-lg cursor-pointer"
      onClick={() => {
        toggle();
        router.push(`/User/${user.name}`);
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
        <Image
          src={user.picture}
          height={64}
          width={64}
          alt={`${user.name} avatar`}
          className="rounded-full border-4 dark:border-night-400"
        />
      </div>
      <div className="flex justify-center">{user.name}</div>
    </div>
  );
}
