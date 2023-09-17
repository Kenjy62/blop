// Components
import Header from "@/app/src/components/UI/Structure/Header";
import Navbar from "@/app/src/components/UI/Structure/Navbar";
import Rightbar from "@/app/src/components/UI/Structure/Rightbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col gap-8">
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-row gap-10 w-[1280px]">
          <Navbar />
          {children}
          <Rightbar />
        </div>
      </div>
    </div>
  );
}
