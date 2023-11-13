// Components
import Modal from "@/app/src/components/Modal/Modal";
import Header from "@/app/src/components/UI/Structure/Header";
import Navbar from "@/app/src/components/UI/Structure/Navbar";
import Rightbar from "@/app/src/components/UI/Structure/Rightbar";

// Context
import Provider from "@/app/src/context/provider";
import SearchContainer from "../src/components/UI/Searchbar/SearchContainer";
import Theme from "../src/components/Tricky/Theme";
import { init } from "../src/features/user";

export default async function Layout({ children }) {
  const { data, message, status } = await init();

  return (
    <Provider defaultTheme={data.darkMode}>
      <Theme>
        <div className="flex flex-col gap-16 dark:bg-night-400 dark:text-white">
          <Header />
          <div className="flex justify-center mb-16 px-2 min-h-[calc(100vh-201px)]">
            <div className="flex flex-row gap-16 w-[1280px]">
              <Navbar />
              {children}
              <Rightbar />
            </div>
          </div>
        </div>
        <SearchContainer />
        <Modal />
      </Theme>
    </Provider>
  );
}
