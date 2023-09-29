// Required
import { init } from "@/app/src/features/user";
import Link from "next/link";

// Icons
import { RxHome, RxBell, RxChatBubble, RxExit, RxPerson } from "react-icons/rx";

export default async function Navbar() {
  const user = await init();

  return (
    <nav className="flex-col gap-8 bg-watermelon-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]">
      <Link href="/Feed">
        <div className="p-2 bg-watermelon-500 rounded-full cursor-pointer">
          <RxHome color="white" size={22} />
        </div>
      </Link>
      <div className="p-2 rounded-full hover:bg-watermelon-500 cursor-pointer">
        <RxBell color="white" size={22} />
      </div>
      <div className="p-2 rounded-full hover:bg-watermelon-500 cursor-pointer">
        <RxChatBubble color="white" size={22} />
      </div>
      <Link href={`/User/${user.name}`}>
        <div className="p-2 rounded-full hover:bg-watermelon-500 cursor-pointer">
          <RxPerson color="white" size={22} />
        </div>
      </Link>
      <Link href="/Logout">
        <div className="p-2 rounded-full hover:bg-watermelon-500 cursor-pointer">
          <RxExit color="white" size={22} />
        </div>
      </Link>
    </nav>
  );
}
