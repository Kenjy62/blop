// Components
import Header from "@/app/src/components/UI/Structure/Header";
import Navbar from "@/app/src/components/UI/Structure/Navbar";
import Rightbar from "@/app/src/components/UI/Structure/Rightbar";
import SearchContainer from "../src/components/UI/Searchbar/Container";
import Theme from "../src/components/Tricky/Theme";
import Popup from "../src/components/Popup/Popup";

// Required
import { notFound } from "next/navigation";

// Toast
import { Toaster } from "react-hot-toast";

// Provider Tree
import Provider from "@/app/src/context/provider";

// Features
import { init } from "../src/features/user";

export default async function Layout({ children }) {
  const { data, status } = await init();

  if (status === 200) {
    return (
      <Provider
        defaultTheme={data?.darkMode ? data.darkMode : false}
        defaultColor={data?.colorScheme ? data.colorScheme : "Watermelon"}
      >
        <Theme>
          <Toaster />
          <div className="flex flex-col gap-0 md:gap-16 bg-white dark:bg-night-400 dark:text-white min-h-[100dvh]">
            <Header
              colorScheme={data?.colorScheme ? data.colorScheme : "Watermelon"}
            />
            <div className="flex justify-center pb-20 md:px-2 ">
              <div className="flex flex-row gap-16 w-[1280px]">
                <Navbar
                  colorScheme={
                    data.colorScheme ? data.colorScheme : "Watermelon"
                  }
                />
                {children}
                <Rightbar />
              </div>
            </div>
          </div>
          <Popup />
          <SearchContainer />
        </Theme>
      </Provider>
    );
  }

  if (status === 400) {
    return notFound();
  }
}
