// Features
import { init } from "@/app/src/features/user";

// Icons
import Items from "./Navbar/Item";

export default async function Navbar({ colorScheme }) {
  const { data, message, status } = await init();

  var color;

  if (colorScheme === "Watermelon") {
    color = `flex-col gap-8 bg-watermelon-400 dark:bg-watermelon-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
  } else if (colorScheme === "harlequin") {
    color = `flex-col gap-8 bg-harlequin-400 dark:bg-harlequin-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
  } else if (colorScheme === "royal-blue") {
    color = `flex-col gap-8 bg-royal-blue-400 dark:bg-royal-blue-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
  } else if (colorScheme === "fire-bush") {
    color = `flex-col gap-8 bg-fire-bush-400 dark:bg-fire-bush-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
  } else if (colorScheme === "cinnabar") {
    color = `flex-col gap-8 bg-cinnabar-400 dark:bg-cinnabar-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
  } else if (colorScheme === "purple-heart") {
    color = `flex-col gap-8 bg-purple-heart-400 dark:bg-purple-heart-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
  }

  if (status === 400) {
    return <nav className={color}>{/* <Items user={data} /> */}</nav>;
  }

  if (status === 200) {
    return (
      <nav className={color}>
        <Items user={data} colorScheme={colorScheme} />
      </nav>
    );
  }
}
