"use client";

// Required
import { useEffect, useState } from "react";

// Components
import Tag from "../UI/Tag/Tag";
import List from "./List";

export default function Tabs({ data }) {
  const Tabs = ["All", "Comment", "Like", "Share", "Message"];
  const [notifications, setNotifications] = useState(data);
  const [isActive, setIsActive] = useState("All");
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    const tabCounts = {};
    Tabs.forEach((tab) => {
      tabCounts[tab] = data.filter(
        (item) =>
          (tab === "All" || item.type.toLowerCase() === tab.toLowerCase()) &&
          item.isRead === 0
      ).length;
    });

    setUnreadCounts(tabCounts);

    if (isActive === "All") {
      setNotifications(data);
    } else {
      const newList = data.filter(
        (el) => el.type.toLowerCase() === isActive.toLowerCase()
      );
      setNotifications(newList);
    }
  }, [isActive, data]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row h-fit gap-2">
        {Tabs.map((tab, id) => {
          return (
            <div key={id} onClick={() => setIsActive(tab)}>
              <Tag key={id} state={isActive === tab ? "Active" : "Unactive"}>
                {tab} ({unreadCounts[tab] || 0})
              </Tag>
            </div>
          );
        })}
      </div>
      <List list={notifications} />
    </div>
  );
}
