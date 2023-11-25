"use client";

// Required
import { useRef, useEffect, useContext } from "react";

// Context
import { UserContext } from "@/app/src/context/user";
import { useRouter } from "next/navigation";

// Components
import Receiver from "../Receiver";
import Sender from "../Sender";

export default function ChatList({ data, userId }) {
  const { socket } = useContext(UserContext);

  const router = useRouter();

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [data]); // Écoutez les changements de la liste de messages

  useEffect(() => {
    if (socket) {
      socket.on("new_message", () => {
        router.refresh();
      });
    }
  }, [socket]);

  return (
    <div className={`dark:bg-night-200 flex-1 flex flex-col`}>
      <div
        className="overflow-y-scroll h-[calc(100vh-361px)] flex flex-col gap-4"
        ref={scrollableDivRef}
      >
        <div className="flex flex-col gap-6 p-4">
          {data.map((item, id) =>
            item.senderId === userId ? (
              <Receiver key={id} data={item} />
            ) : (
              <Sender key={id} data={item} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
