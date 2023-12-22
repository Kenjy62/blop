"use client";

// Components
import { SyncLoader } from "react-spinners";

// Hooks
import useColorTheme from "../src/hooks/useColorTheme";

export default function Loading() {
  const theme = useColorTheme();

  return (
    <div className="flex justify-center w-full">
      <SyncLoader color={!theme ? "black" : "white"} loading={true} />
    </div>
  );
}
