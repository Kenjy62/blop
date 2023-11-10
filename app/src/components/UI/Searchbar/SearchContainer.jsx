"use client";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "@/app/src/context/search";
import { onSearch } from "@/app/src/features/searchbar";
import User from "./Structure/User";

export default function SearchContainer() {
  const { state, query } = useContext(SearchContext);
  const [userList, setUserList] = useState();

  const test = async () => {
    const response = await onSearch(query);

    console.log(response);

    setUserList(response);
  };

  useEffect(() => {
    if (query?.length > 0) test();
    if (query?.length < 1) setUserList();
  }, [query]);

  if (state)
    return (
      <div className=" absolute top-[74px] h-[calc(100vh-74px)] w-full bg-white p-4">
        {userList?.length > 0
          ? userList.map((user) => {
              return <User user={user} />;
            })
          : "Aucun résultat"}
      </div>
    );

  return null;
}
