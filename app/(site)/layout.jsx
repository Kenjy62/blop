// Components
import Modal from "@/app/src/components/Modal/Modal";
import Header from "@/app/src/components/UI/Structure/Header";
import Navbar from "@/app/src/components/UI/Structure/Navbar";
import Rightbar from "@/app/src/components/UI/Structure/Rightbar";
import SearchContainer from "../src/components/UI/Searchbar/SearchContainer";
import Theme from "../src/components/Tricky/Theme";
import Overlay from "../src/components/Overlay/Overlay";

// Toast
import { Toaster } from "react-hot-toast";

// Context
import Provider from "@/app/src/context/provider";

// Features
import { init } from "../src/features/user";

export default async function Layout({ children }) {
  const { data } = await init();

  return (
    <Provider
      defaultTheme={data?.darkMode ? data.darkMode : false}
      defaultColor={data?.colorScheme ? data.colorScheme : "Watermelon"}
    >
      <Theme>
        <Toaster />
        <div className="flex flex-col gap-16 dark:bg-night-400 dark:text-white">
          <Header
            colorScheme={data?.colorScheme ? data.colorScheme : "Watermelon"}
          />
          <div className="flex justify-center mb-16 px-2 min-h-[calc(100vh-201px)]">
            <div className="flex flex-row gap-16 w-[1280px]">
              <Navbar
                colorScheme={data.colorScheme ? data.colorScheme : "Watermelon"}
              />
              {children}
              <Rightbar />
            </div>
          </div>
        </div>
        <SearchContainer />
        <Overlay />
        <Modal defaultTheme={data?.darkMode ? data.darkMode : false} />
      </Theme>
    </Provider>
  );
}
