"use client";

// Components
import { SyncLoader } from "react-spinners";

// Hooks
import useColorTheme from "@/app/src/hooks/useColorTheme";

export default function Loading() {
  const theme = useColorTheme();

  return (
    <div className="flex justify-center items-center w-full h-[calc(100dvh-210px)] md:h-auto">
      <SyncLoader color={!theme ? "black" : "white"} loading={true} />
    </div>
  );
}
