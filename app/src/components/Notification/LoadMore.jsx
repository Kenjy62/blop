"use client";

// Required
import { useRef, useEffect, useState } from "react";

// Components
import Item from "./Item";

// Features
import { getNotifications } from "../../features/user";

// Hooks
import useColorTheme from "../../hooks/useColorTheme";

// Spinner
import { SyncLoader } from "react-spinners";

export default function LoadMore({ tab }) {
  // References
  const divRef = useRef();

  const { theme } = useColorTheme();

  // State
  const [isVisible, setIsVisible] = useState(false);
  const [skip, setSkip] = useState(10);
  const [limit, setLimit] = useState(10);
  const [notifications, setNotifications] = useState([]);
  const [noNotifications, setNoNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const handleScroll = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setIsVisible(
        rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  };

  useEffect(() => {
    // Ajoutez un gestionnaire d'événements de défilement
    window.addEventListener("scroll", handleScroll);

    // Assurez-vous de retirer le gestionnaire d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <SyncLoader color={!theme ? "black" : "white"} loading={true} />
          ) : (
            "There are no more posts"
          )
        ) : null}
      </div>
    </>
  );
}
