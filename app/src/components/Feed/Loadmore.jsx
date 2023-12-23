"use client";

// Required
import { useRef, useEffect, useState } from "react";

// Features
import { GetAllPost, GetFollowedPost } from "../../features/post";

// Components
import Post from "./Post/Post";

// Spinner
import { SyncLoader } from "react-spinners";

// Hooks
import useColorTheme from "../../hooks/useColorTheme";
import { useIsVisible } from "react-is-visible";

export default function LoadMore({ user, order }) {
  // References
  const divRef = useRef();

  const { theme } = useColorTheme();

  // State
  const [post, setPost] = useState([]);
  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(5);
  const [noPost, setNoPost] = useState(false);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    if (!order || order === "All") {
      const { data, message, status } = await GetAllPost(skip, limit);
      setSkip((prev) => prev + 5);

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
    }

    if (order === "Followed") {
      const { data, message, status } = await GetFollowedPost(skip, limit);
      setSkip((prev) => prev + 5);

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

  useEffect(() => {
    setPost([]);
    setNoPost(false);
    setSkip(5);
    setLimit(5);
  }, [order]);

  const isVisible = useIsVisible(divRef);

  return (
    <>
      {post?.length > 0 &&
        post.map((item) => (
          <Post key={item.id} userId={user.data.id} post={item} />
        ))}
      <div ref={divRef} className="flex justify-center">
        {isVisible ? (
          !noPost ? (
            <SyncLoader loading={true} />
          ) : (
            <p>No more post for this moment!</p>
          )
        ) : null}
      </div>
    </>
  );
}
