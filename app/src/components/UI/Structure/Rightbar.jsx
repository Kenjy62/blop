// Components
import LastUsers from "./Rightbar/LastUsers";
import TopHashtags from "./Rightbar/TopHashtags";

// Config
import { config } from "@/app/src/config/config";

export default function Rightbar() {
  return (
    <>
      <div className="w-[320px] h-fit sticky top-[105px] flex-col gap-6 hidden lg:flex">
        {!config.hashtags.hide && <TopHashtags />}
        {!config.lastusers.hide && <LastUsers />}
      </div>
    </>
  );
}
