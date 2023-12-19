// Components
import Searchbar from "../Searchbar/Input";
import UserBar from "../User/UserBar";
import Logo from "./Header/Logo";

export default function Header({ colorScheme }) {
  var color;

  if (colorScheme === "Watermelon") {
    color = `sticky z-40 top-0 w-full flex justify-center p-4 bg-white dark:bg-night-400 border-b border-watermelon-400`;
  } else if (colorScheme === "harlequin") {
    color = `sticky z-40 top-0 w-full flex justify-center p-4 bg-white dark:bg-night-400 border-b border-harlequin-400`;
  } else if (colorScheme === "royal-blue") {
    color = `sticky z-40 top-0 w-full flex justify-center p-4 bg-white dark:bg-night-400 border-b border-royal-blue-400`;
  } else if (colorScheme === "fire-bush") {
    color = `sticky z-40 top-0 w-full flex justify-center p-4 bg-white dark:bg-night-400 border-b border-fire-bush-400`;
  } else if (colorScheme === "cinnabar") {
    color = `sticky z-40 top-0 w-full flex justify-center p-4 bg-white dark:bg-night-400 border-b border-cinnabar-400`;
  } else if (colorScheme === "purple-heart") {
    color = `sticky z-40 top-0 w-full flex justify-center p-4 bg-white dark:bg-night-400 border-b border-purple-heart-400`;
  }

  return (
    <header className={color}>
      <div className="w-[1280px] justify-between flex flex-row gap-4 items-center">
        <Logo />
        <Searchbar />
        <UserBar />
      </div>
    </header>
  );
}
