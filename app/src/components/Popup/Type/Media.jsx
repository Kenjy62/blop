import Image from "next/image";

// Components
import CloseButton from "../CloseButton";

import { useContext } from "react";
import { PopupContext } from "@/app/src/context/popup";

export default function Media() {
  const { data } = useContext(PopupContext);

  return (
    <div className="relative h-full w-full">
      <Image
        src={`${data}`}
        width={1920}
        height={1080}
        className="rounded-lg object-cover w-full h-full"
      />
      <div className="absolute right-2 top-2">
        <CloseButton />
      </div>
    </div>
  );
}
