"use client";

// Required
import { useRef, useEffect, useState } from "react";

// Components
import { SyncLoader } from "react-spinners";

// Hooks
import useColorTheme from "@/app/src/hooks/useColorTheme";
import Post from "../Feed/Post/Post";

export default function LoadMore({ selectedTag, BookmarksList, userId }) {
  // References
  const divRef = useRef();

  const { theme } = useColorTheme();

  // State
  const [isVisible, setIsVisible] = useState(false);
  const [post, setPost] = useState([]);
  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(10);
  const [noPost, setNoPost] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (post.length < 1) {
      setPost(BookmarksList.slice(skip, limit));
    } else {
      setPost((prev) => [...prev, ...BookmarksList.slice(skip, limit)]);
    }

    if (post.length + 5 >= length) {
      setNoPost(true);
    }

    setSkip((prev) => prev + 5);
    setLimit((prev) => prev + 5);

    setLoading(false);
  }

  useEffect(() => {
    if (isVisible) {
      if (!noPost && !loading) {
        load();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    setPost([]);
    setNoPost(false);
    setSkip(5);
    setLimit(10);
  }, [selectedTag]);

  return (
    <>
      {post.length > 0 &&
        post.map((item, id) => (
          <Post key={id} userId={userId} post={item.post} />
        ))}
      <div ref={divRef} className="flex justify-center">
        {isVisible ? (
          !noPost ? (
            <SyncLoader color={!theme ? "black" : "white"} loading={true} />
          ) : (
            "There are no more posts"
          )
        ) : null}
      </div>
    </>
  );
}
