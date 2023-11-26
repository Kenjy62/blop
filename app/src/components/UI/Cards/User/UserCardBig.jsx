// Required
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";

// Components
import Picture from "../../User/Picture";

// Context
import { SearchContext } from "@/app/src/context/search";

export default function UserCardBig({ user }) {
  const { toggle } = useContext(SearchContext);

  return (
    <Link href={`/User/${user.name}`}>
      <div
        className="w-48 h-44 bg-watermelon-400 dark:bg-night-400 rounded-lg cursor-pointer"
        onClick={() => {
          toggle();
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
          <Picture
            url={user.picture}
            name={user.name}
            link={false}
            style={"rounded-full h-14 w-14 rounded-full object-cover"}
          />
        </div>
        <div className="flex justify-center">{user.name}</div>
      </div>
    </Link>
  );
}
