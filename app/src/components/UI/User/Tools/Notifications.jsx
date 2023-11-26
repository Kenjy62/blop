"use client";

// Required
import { useContext, useEffect, useRef, useState } from "react";

// Icons
import { RxBell } from "react-icons/rx";

// Context
import { UserContext } from "@/app/src/context/user";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

// Components
import { TriangleTop } from "../../../Tricky/Triangle";
import Container from "../Notification/Container";
import Indicator from "../Notification/Indicator";

export default function Notifications({ user_id, data }) {
  const [notifications, setNotifications] = useState(
    data.filter((item) => item.isRead === 0 && item.type !== "chat")
  );

  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef();

  const { socketInit, socket } = useContext(UserContext);

  const colorScheme = CheckColorScheme();

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
      socketInit(user_id);

      socket.on("new_notification", (data) => {
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
        <RxBell />
      </div>
      {isOpen && (
        <div ref={divRef} className="top-[55px] absolute flex flex-col">
          <TriangleTop />
          <Container
            colorScheme={colorScheme}
            data={notifications}
            type="Notification"
          />
        </div>
      )}
    </>
  );
}
