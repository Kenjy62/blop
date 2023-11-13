// Required
import { init } from "@/app/src/features/user";

// Icons
import Items from "./Navbar/Item";

export default async function Navbar() {
  const { data, message, status } = await init();

  if (status === 400) {
    return (
      <nav className="flex-col gap-8 bg-watermelon-400 dark:bg-night-300 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]">
        {/* <Items user={data} /> */}
      </nav>
    );
  }

  if (status === 200) {
    return (
      <nav className="flex-col gap-8 bg-watermelon-400 dark:bg-night-300 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]">
        <Items user={data} />
      </nav>
    );
  }
}
