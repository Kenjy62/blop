"use client";

// Required
import { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Features
import {
  getSpecifiqueUserFollowers,
  getSpecifiqueUserFollows,
} from "../../features/user";

// Hooks
import useColorTheme from "../../hooks/useColorTheme";

// Spinner
import { SyncLoader } from "react-spinners";

// Components
import FollowCard from "../UI/Cards/FollowCard";

export default function LoadMore({ user, type }) {
  const params = useParams();

  const { theme } = useColorTheme();

  // References
  const divRef = useRef();

  // State
  const [isVisible, setIsVisible] = useState(false);
  const [datas, setDatas] = useState([]);
  const [skip, setSkip] = useState(6);
  const [noDatas, setNoDatas] = useState(false);
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

    if (type === "Follow") {
      const { data, message, status } = await getSpecifiqueUserFollows(
        user.data.name,
        skip
      );

      setSkip((prev) => prev + 5);

      if (data.length === 5) {
        setNoDatas(false);
        if (datas.length > 0) {
          setDatas((prev) => [...prev, ...data]);
        } else {
          setDatas(data);
        }
      } else {
        setNoDatas(true);
        if (datas.length > 0) {
          setDatas((prev) => [...prev, ...data]);
        } else {
          setDatas(data);
        }
      }
    }

    if (type === "Follower") {
      const { data, message, status } = await getSpecifiqueUserFollowers(
        user.data.name,
        skip
      );

      setSkip((prev) => prev + 5);

      if (data.length === 5) {
        setNoDatas(false);
        if (datas.length > 0) {
          setDatas((prev) => [...prev, ...data]);
        } else {
          setDatas(data);
        }
      } else {
        setNoDatas(true);
        if (datas.length > 0) {
          setDatas((prev) => [...prev, ...data]);
        } else {
          setDatas(data);
        }
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    if (isVisible) {
      if (!noDatas && !loading) {
        load();
      }
    }
  }, [isVisible]);

  return (
    <>
      {datas?.length > 0 &&
        datas.map((item, id) => (
          <FollowCard
            key={id}
            item={item}
            isMyProfil={params.name === user.data.name ? true : false}
          />
        ))}
      <div ref={divRef} className="flex justify-center w-full">
        {isVisible ? (
          !noDatas ? (
            <SyncLoader color={!theme ? "black" : "white"} loading={true} />
          ) : (
            "No more data.."
          )
        ) : null}
      </div>
    </>
  );
}
