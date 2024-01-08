"use client";

// Required
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Features
import {
  GetUserMedias,
  GetUserPosts,
  GetUserPostsLiked,
  GetUserPostsShared,
} from "../../features/user";

// Components
import Post from "../Feed/Post/Post";

// Hooks
import { useIsVisible } from "react-is-visible";

export default function LoadMore({ user, profil, type }) {
  const divRef = useRef();
  const isVisible = useIsVisible(divRef);

  const [skip, setSkip] = useState(5);
  const [post, setPost] = useState([]);
  const [noPost, setNoPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function load() {
    setIsLoading(true);
    if (type === "Post") {
      const { data, message, status } = await GetUserPosts(
        profil,
        skip
      );

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

    if (type === "Share") {
      const { data, message, status } = await GetUserPostsShared(
        profil,
        skip
      );

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

    if (type === "Like") {
      const { data, message, status } = await GetUserPostsLiked(
        profil,
        skip
      );

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

    if (type === "Media") {
      const { data, message, status } = await GetUserMedias(
        profil,
        skip
      );

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
    setIsLoading(false);
  }

  useEffect(() => {
    if (isVisible) {
      if (!noPost && !isLoading) {
        load();
      }
    }
  }, [isVisible]);

  return (
    <>
      {post?.length > 0 &&
        type !== "Media" &&
        post.map((item) => (
          <Post key={item.id} userId={user.data.id} post={item} />
        ))}
      {post?.length > 0 &&
        type === "Media" &&
        post.map((post) => {
          return post.picture.map((item, id) => {
            return (
              <Link
                key={id}
                href={`/Post/${post.id}`}
                className="w-[calc(100%/4-12px)]"
              >
                <Image
                  className="rounded-lg border dark:border-night-200 shadow-md"
                  src={item.url}
                  height={500}
                  width={500}
                  alt={`Post Picture`}
                />
              </Link>
            );
          });
        })}
      <div className="flex justify-center w-full" ref={divRef}>
        <p>{isVisible ? (!noPost ? "Loading" : "No more content...") : null}</p>
      </div>
    </>
  );
}
