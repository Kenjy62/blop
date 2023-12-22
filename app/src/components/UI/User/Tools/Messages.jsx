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
import Indicator from "../Notification/Indicator";

// Hooks
import { useColorScheme } from "@/app/src/hooks/useColorScheme";

export default function Messages({ user_id, data }) {
  const [notifications, setNotifications] = useState(
    data.filter((item) => item.isRead === 0 && item.type === "chat")
  );

  const colorScheme = useColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `absolute text-xs rounded-full h-4 w-4 text-white bg-watermelon-400 top-[-17px] right-[-8px] flex justify-center items-center`;
  } else if (colorScheme === "harlequin") {
    color = `absolute text-xs rounded-full h-4 w-4 text-white bg-harlequin-400 top-[-17px] right-[-8px] flex justify-center items-center`;
  } else if (colorScheme === "royal-blue") {
    color = `absolute text-xs rounded-full h-4 w-4 text-white bg-royal-blue-400 top-[-17px] right-[-8px] flex justify-center items-center`;
  } else if (colorScheme === "fire-bush") {
    color = `absolute text-xs rounded-full h-4 w-4 text-white bg-fire-bush-400 top-[-17px] right-[-8px] flex justify-center items-center`;
  } else if (colorScheme === "cinnabar") {
    color = `absolute text-xs rounded-full h-4 w-4 text-white bg-cinnabar-400 top-[-17px] right-[-8px] flex justify-center items-center`;
  } else if (colorScheme === "purple-heart") {
    color = `absolute text-xs rounded-full h-4 w-4 text-white bg-purple-heart-400 top-[-17px] right-[-8px] flex justify-center items-center`;
  }

  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef();

  const { socket } = useContext(UserContext);

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
      socket.on("new_notification_message", (data) => {
        setNotifications((prev) => [data, ...prev]);
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
        {notifications.length !== 0 && (
          <Indicator style={color} notifications={notifications} />
        )}
        <RxChatBubble />
      </div>
      {isOpen && (
        <div ref={divRef} className="top-[55px] absolute flex flex-col mr-8">
          <TriangleTop />
          <Container
            colorScheme={colorScheme}
            data={notifications}
            type="Chat"
          />
        </div>
      )}
    </>
  );
}
