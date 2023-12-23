"use client";

// Required
import { useRef, useEffect, useState } from "react";

// Components
import Item from "./Item";

// Features
import { getNotifications } from "../../features/user";

// Hooks
import useColorTheme from "../../hooks/useColorTheme";
import { useIsVisible } from "react-is-visible";

// Spinner
import { SyncLoader } from "react-spinners";

export default function LoadMore({ tab }) {
  // References
  const divRef = useRef();
  const isVisible = useIsVisible(divRef);

  // Hooks
  const { theme } = useColorTheme();

  // State
  const [skip, setSkip] = useState(10);
  const [limit, setLimit] = useState(10);
  const [notifications, setNotifications] = useState([]);
  const [noNotifications, setNoNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, message, status } = await getNotifications(skip);

    var filteredData;

    if (tab !== "All") {
      filteredData = data.filter(
        (el) => el.type.toLowerCase() === tab.toLowerCase()
      );
    } else {
      filteredData = data;
    }

    setSkip((prev) => prev + 5);

    if (filteredData.length === 10) {
      setNoNotifications(false);
      if (notifications.length > 0) {
        setNotifications((prev) => [...prev, ...filteredData]);
      } else {
        setNotifications(filteredData);
      }
    } else {
      setNoNotifications(true);
      if (notifications.length > 0) {
        setNotifications((prev) => [...prev, ...filteredData]);
      } else {
        setNotifications(filteredData);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    if (isVisible) {
      if (!noNotifications && !loading) {
        load();
      }
    }
  }, [isVisible]);

  return (
    <>
      {notifications?.length > 0 &&
        notifications.map((item, id) => <Item item={item} key={id} />)}
      <div ref={divRef} className="flex justify-center">
        {isVisible ? (
          !noNotifications ? (
            <SyncLoader color={theme ? "black" : "white"} loading={true} />
          ) : (
            "There are no more posts"
          )
        ) : null}
      </div>
    </>
  );
}
