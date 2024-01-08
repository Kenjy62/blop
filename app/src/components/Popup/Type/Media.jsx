import Image from "next/image";

// Components
import CloseButton from "../CloseButton";

import { useContext } from "react";
import { PopupContext } from "@/app/src/context/popup";

export default function Media() {
  const { data } = useContext(PopupContext);

  return (
    <div className="relative flex justify-center items-center">
      <img
        src={`${data}`}
        className="rounded-lg relative"
      />
      <div className="absolute right-2 top-2">
        <CloseButton />
      </div>
    </div>
  );
}
