"use client";

// Required
import { useContext, useEffect, useState, useRef } from "react";

// Context
import { UserContext } from "@/app/src/context/user";

// Icons
import { RxChatBubble } from "react-icons/rx";

// Components
import { TriangleTop } from "../../../Tricky/Triangle";
import Container from "../Notification/Container";

export default function Messages({ user_id, data }) {
  const [notifications, setNotifications] = useState(
    data.filter((item) => item.isRead === 0 && item.type === "chat").length
  );

  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef();

  const { socketInit, socket } = useContext(UserContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("new_notification_message", () => {
        console.log("new_chat");
        setNotifications((prevValue) => prevValue + 1);
      });
    }
  }, [socket]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleClick}>
        {notifications !== 0 && (
          <div className="absolute text-xs rounded-full h-4 w-4 text-white bg-watermelon-400 top-[-17px] right-[-8px] flex justify-center items-center">
            {notifications}
          </div>
        )}
        <RxChatBubble />
      </div>
      {isOpen && (
        <div ref={divRef} className="top-[55px] absolute flex flex-col mr-8">
          <div className="flex justify-end">
            <TriangleTop />
          </div>
          <Container data={data} type="Chat" />
        </div>
      )}
    </>
  );
}
