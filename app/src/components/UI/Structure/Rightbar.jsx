// Components
import TopHashtags from "./Rightbar/TopHashtags";

export default function Rightbar() {
  return (
    <>
      <div className="w-[320px] h-fit sticky top-[105px] flex-col gap-6 hidden md:flex">
        <TopHashtags />
      </div>
    </>
  );
}
