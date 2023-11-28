"use client";

// Required
import { useRef, useEffect, useState } from "react";

// Features
import { GetAllPost, GetFollowedPost } from "../../features/post";

// Components
import Post from "./Post/Post";

// Spinner
import { SyncLoader } from "react-spinners";

export default function LoadMore({ user, order }) {
  // References
  const divRef = useRef();

  // State
  const [isVisible, setIsVisible] = useState(false);
  const [post, setPost] = useState([]);
  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(5);
  const [noPost, setNoPost] = useState(false);
  const [loading, setLoading] = useState(true);
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
    setTimeout(async () => {
      if (!order || order === "All") {
        const { data, message, status } = await GetAllPost(skip, limit);
        if (data.length < 5) {
          setNoPost(true);
        } else {
          setSkip((prev) => prev + 5);
          setLimit((prev) => prev + 5);
          setPost(data);
        }
      } else if (order === "Followed") {
        const { data, message, status } = await GetFollowedPost(skip, limit);
        if (data.length === 0) {
          setNoPost(true);
        } else {
          setSkip((prev) => prev + 5);
          setLimit((prev) => prev + 5);
          setPost(data);
        }
      }
    }, 5000);
  }

  useEffect(() => {
    if (isVisible) {
      load();
    }
  }, [isVisible]);

  useEffect(() => {
    setPost([]);
    setNoPost(false);
    setSkip(0);
    setLimit(5);
  }, [order]);

  return (
    <>
      {post?.length > 0 &&
        post.map((item) => (
          <Post key={item.id} userId={user.data.id} post={item} />
        ))}
      <div ref={divRef} className="flex justify-center">
        {isVisible ? (
          !noPost ? (
            <SyncLoader color={color} loading={loading} />
          ) : (
            "Plus de post à charger"
          )
        ) : null}
      </div>
    </>
  );
}
