"use client";

// Required
import { useContext, useEffect, useState, useTransition } from "react";

// Context
import { SearchContext } from "@/app/src/context/search";

// Features
import { onSearch } from "@/app/src/features/searchbar";

// Hooks
import useColorTheme from "@/app/src/hooks/useColorTheme";

// Components
import Result from "./Result";
import { SyncLoader } from "react-spinners";

export default function SearchContainer() {
  const { state, query } = useContext(SearchContext);
  const [userList, setUserList] = useState();
  const [post, setPost] = useState();

  const [isPending, startTransition] = useTransition();

  const theme = useColorTheme();

  const test = async () => {
    startTransition(async () => {
      const { user, post } = await onSearch(query);
      setUserList(user);
      setPost(post);
    });
  };

  useEffect(() => {
    if (query?.length > 3) test();
    if (query?.length < 1) {
      setUserList();
      setPost();
    }
  }, [query]);

  if (state) {
    return (
      <div className="absolute top-[74px] h-[calc(100vh-74px)] w-full bg-white p-4 dark:bg-night-300 dark:text-white flex justify-center">
        <div className="w-[1280px]">
          {(userList?.length > 0 && !isPending) ||
          (post?.length > 0 && !isPending) ? (
            <Result user={userList} post={post} />
          ) : isPending ? (
            <div className="flex justify-center">
              <SyncLoader color={!theme ? "black" : "white"} loading={true} />
            </div>
          ) : (
            <div className="flex justify-center">
              Unknow results for this query
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
