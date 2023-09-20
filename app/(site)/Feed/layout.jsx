// Components
import Modal from "@/app/src/components/Modal/Modal";
import Header from "@/app/src/components/UI/Structure/Header";
import Navbar from "@/app/src/components/UI/Structure/Navbar";
import Rightbar from "@/app/src/components/UI/Structure/Rightbar";
import Provider from "@/app/src/context/provider";

export default function Layout({ children }) {
  return (
    <Provider>
      <div className="flex flex-col gap-16">
        <Header />
        <div className="flex justify-center mb-16">
          <div className="flex flex-row gap-16 w-[1280px]">
            <Navbar />
            {children}
            <Rightbar />
          </div>
        </div>
      </div>
      <Modal />
    </Provider>
  );
}
