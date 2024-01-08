// Features
import { init } from "@/app/src/features/user";

// Components
import Items from "./Navbar/Item";

export default async function Navbar({ colorScheme }) {
  const { data, message, status } = await init();

  var color;
  var mobile;

  if (colorScheme === "Watermelon") {
    color = `flex-col gap-8 bg-watermelon-400 dark:bg-watermelon-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
    mobile = `md:hidden z-50 fixed w-full flex flex-row gap-4 justify-between p-4 bg-white dark:bg-night-300 border-t-2 border-watermelon-500 bottom-0 left-0`;
  } else if (colorScheme === "harlequin") {
    color = `flex-col gap-8 bg-harlequin-400 dark:bg-harlequin-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
    mobile = `md:hidden z-50 fixed w-full flex flex-row gap-4 justify-between p-4 bg-white dark:bg-night-300 border-t-2 border-harlequin-500 bottom-0 left-0`;
  } else if (colorScheme === "royal-blue") {
    color = `flex-col gap-8 bg-royal-blue-400 dark:bg-royal-blue-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
    mobile = `md:hidden z-50 fixed w-full flex flex-row gap-4 justify-between p-4 bg-white dark:bg-night-300 border-t-2 border-royal-blue-500 bottom-0 left-0`;
  } else if (colorScheme === "fire-bush") {
    color = `flex-col gap-8 bg-fire-bush-400 dark:bg-fire-bush-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
    mobile = `md:hidden z-50 fixed w-full flex flex-row gap-4 justify-between p-4 bg-white dark:bg-night-300 border-t-2 border-fire-bush-500 bottom-0 left-0`;
  } else if (colorScheme === "cinnabar") {
    color = `flex-col gap-8 bg-cinnabar-400 dark:bg-cinnabar-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
    mobile = `md:hidden z-50 fixed w-full flex flex-row gap-4 justify-between p-4 bg-white dark:bg-night-300 border-t-2 border-cinnabar-500 bottom-0 left-0`;
  } else if (colorScheme === "purple-heart") {
    color = `flex-col gap-8 bg-purple-heart-400 dark:bg-purple-heart-400 rounded-lg p-4 hidden md:flex h-fit sticky top-[105px]`;
    mobile = `md:hidden z-50 fixed w-full flex flex-row gap-4 justify-between p-4 bg-white dark:bg-night-300 border-t-2 border-purple-heart-500 bottom-0 left-0`;
  }

  if (status === 400) {
    return <nav className={color}>{/* <Items user={data} /> */}</nav>;
  }

  if (status === 200) {
    return (
      <>
        <nav className={color}>
          <Items user={data} colorScheme={colorScheme} type={'Desktop'} />
        </nav>
        <nav className={mobile}>
          <Items user={data} colorScheme={colorScheme} type={'Mobile'} />
        </nav>
      </>
    );
  }
}
