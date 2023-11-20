"use client";

// Required
import { useContext, useEffect, useState } from "react";

// Icons
import { RxBell } from "react-icons/rx";

// Context
import { UserContext } from "@/app/src/context/user";
import Comment from "../Notification/Comment";

export default function Notifications({ user_id, data }) {
  const [notifications, setNotifications] = useState(
    data.filter((item) => item.isRead === 0 && item.type !== "message").length
  );

  const [isOpen, setIsOpen] = useState(false);

  const { socketInit, socket } = useContext(UserContext);

  useEffect(() => {
    if (socket) {
      socketInit(user_id);

      socket.on("new_notification", () => {
        setNotifications(notifications + 1);
      });
    }
  }, [socket]);

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {notifications !== 0 && (
          <div className="absolute text-xs rounded-full h-4 w-4 text-white bg-watermelon-400 top-[-17px] right-[-8px] flex justify-center items-center">
            {notifications}
          </div>
        )}
        <RxBell />
      </div>
      {isOpen && <Comment />}
    </>
  );
}
