"use client";

// Required
import { useRef, useEffect, useState } from "react";

// Components
import { SyncLoader } from "react-spinners";
import Post from "../Feed/Post/Post";

// Hooks
import useColorTheme from "@/app/src/hooks/useColorTheme";
import { useIsVisible } from "react-is-visible";

export default function LoadMore({ selectedTag, BookmarksList, userId }) {
  // References
  const divRef = useRef();
  const isVisible = useIsVisible(divRef);

  const { theme } = useColorTheme();

  // State
  const [post, setPost] = useState([]);
  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(10);
  const [noPost, setNoPost] = useState(false);
  const [loading, setLoading] = useState(false);

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
