"use client";

import { useRef, useEffect } from "react";
import Receiver from "../Receiver";
import Sender from "../Sender";

export default function ChatList({ data, userId }) {
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [data]); // Écoutez les changements de la liste de messages

  return (
    <div className={`dark:bg-night-200 flex-1 flex flex-col`}>
      <div
        className="overflow-y-scroll h-[calc(100vh-361px)] flex flex-col gap-4"
        ref={scrollableDivRef}
      >
        <div className="p-4">
          {data.map((item) =>
            item.senderId === userId ? (
              <Receiver key={item.id} data={item} />
            ) : (
              <Sender key={item.id} data={item} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
