"use client";

// Required
import { useContext } from "react";
import { useRouter } from "next/navigation";

// Icons
import { RxCheck } from "react-icons/rx";

// Context
import { ThemeContext } from "@/app/src/context/theme";

// Features
import { updateNotificationSetting } from "@/app/src/features/user";

export default function Color({ name, hex }) {
  const router = useRouter();

  const { colorScheme, changeColor } = useContext(ThemeContext);

  const updateScheme = async () => {
    await updateNotificationSetting("ColorScheme", name);
    changeColor(name);
    router.refresh();
  };

  return (
    <div
      onClick={() => updateScheme("ColorScheme", name)}
      style={{ background: hex }}
      className={`h-8 w-8 rounded-full flex justify-center items-center cursor-pointer`}
    >
      {name === colorScheme && <RxCheck />}
    </div>
  );
}
