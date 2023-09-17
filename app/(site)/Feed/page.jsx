// Components
import Feed from "@/app/src/components/Feed/Feed";
import Textarea from "@/app/src/components/Feed/Textarea";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8 px-2 md:px-0">
      <Textarea />
      <Feed />
    </div>
  );
}
