"use client";

// Required
import { useRef, useEffect, useState } from "react";

// Features
import { GetTrend } from "@/app/src/features/post";

// Components
import { SyncLoader } from "react-spinners";
import Post from "../Post/Post";

// Hooks
import useColorTheme from "@/app/src/hooks/useColorTheme";
import { useIsVisible } from "react-is-visible";

export default function LoadMore({ query, user }) {
  // References
  const divRef = useRef();
  const isVisible = useIsVisible(divRef);

  const { theme } = useColorTheme();

  // State
  const [post, setPost] = useState([]);
  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(5);
  const [noPost, setNoPost] = useState(false);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);

    const { data, message, status } = await GetTrend(query, skip);

    if (data.length === 5) {
      setNoPost(false);
      if (post.length > 0) {
        setPost((prev) => [...prev, ...data]);
      } else {
        setPost(data);
      }
    } else {
      setNoPost(true);
      if (post.length > 0) {
        setPost((prev) => [...prev, ...data]);
      } else {
        setPost(data);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    if (isVisible) {
      if (!noPost && !loading) {
        load();
      }
    }
  }, [isVisible]);

  return (
    <>
      {post?.length > 0 &&
        post.map((item, id) => (
          <Post key={id} userId={user.data.id} post={item.post} />
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
