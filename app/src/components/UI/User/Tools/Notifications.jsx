"use client";

// Required
import { useContext, useEffect } from "react";
// Icons
import { RxBell } from "react-icons/rx";

// Context
import { UserContext } from "@/app/src/context/user";

export default function Notifications({ user }) {
  const { socketInit } = useContext(UserContext);

  useEffect(() => {
    socketInit(user.id);
  }, []);

  return (
    <div className="relative">
      <div className="absolute text-xs rounded-full h-4 w-4 text-white bg-watermelon-400 top-[-17px] right-[-8px] flex justify-center items-center">
        1
      </div>
      <RxBell />
    </div>
  );
}
