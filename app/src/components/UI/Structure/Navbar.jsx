// Required
import { init } from "@/app/src/features/user";
import Link from "next/link";

// Icons
import { RxHome, RxBell, RxChatBubble, RxExit, RxPerson } from "react-icons/rx";
import Items from "./Navbar/Item";

export default async function Navbar() {
  const user = await init();

  return (
    <nav className="flex-col gap-8 bg-watermelon-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]">
      <Items user={user} />
    </nav>
  );
}
