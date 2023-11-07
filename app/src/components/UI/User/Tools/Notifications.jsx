"use client";

// Required
import { useContext, useEffect, useState } from "react";
// Icons
import { RxBell } from "react-icons/rx";

// Context
import { UserContext } from "@/app/src/context/user";
import Comment from "../Notification/Comment";

export default function Notifications({ user }) {
  const [commentNotificationCount, setCommentNotificationCount] = useState(
    user.comment_notification
  );

  const [isOpen, setIsOpen] = useState(false);

  const { socketInit, socket } = useContext(UserContext);

  useEffect(() => {
    if (socket) {
      socketInit(user.id);

      socket.on("incrementCommentNotification", (data) => {
        setCommentNotificationCount(commentNotificationCount + 1);
      });
    }
  }, [socket]);

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute text-xs rounded-full h-4 w-4 text-white bg-watermelon-400 top-[-17px] right-[-8px] flex justify-center items-center">
          {commentNotificationCount}
        </div>
        <RxBell />
      </div>
      {isOpen && <Comment />}
    </>
  );
}
