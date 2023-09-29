// Components
import Searchbar from "../Searchbar/Searchbar";
import UserBar from "../User/UserBar";

export default function Header() {
  return (
    <header className="sticky z-50 top-0 border-b w-full border-watermelon-300 flex justify-center p-4 bg-white">
      <div className="w-[1280px] justify-between flex flex-row gap-4 items-center">
        <div>Blop</div>
        <Searchbar />
        <div className="flex flex-row-reverse gap-4 items-center">
          <UserBar />
        </div>
      </div>
    </header>
  );
}
