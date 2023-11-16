"use client";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "@/app/src/context/search";
import { onSearch } from "@/app/src/features/searchbar";
import User from "./Structure/User";
import Result from "./Result";

export default function SearchContainer() {
  const { state, query } = useContext(SearchContext);
  const [userList, setUserList] = useState();
  const [post, setPost] = useState();

  const test = async () => {
    const { user, post } = await onSearch(query);
    setUserList(user);
    setPost(post);
  };

  useEffect(() => {
    if (query?.length > 0) test();
    if (query?.length < 1) {
      setUserList();
      setPost();
    }
  }, [query]);

  if (state) {
    return (
      <div className=" absolute top-[74px] h-[calc(100vh-74px)] w-full bg-white p-4 dark:bg-night-300 dark:text-white">
        {userList?.length > 0 || post?.length > 0 ? (
          <Result user={userList} post={post} />
        ) : (
          "Aucun résultat"
        )}
      </div>
    );
  }

  return null;
}
