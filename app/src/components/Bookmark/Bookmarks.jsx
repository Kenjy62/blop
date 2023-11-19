"use client";

// Required
import { useEffect, useState } from "react";

// Components
import Post from "../Feed/Post/Post";
import Tag from "../UI/Tag/Tag";

export default function Bookmarks({ BookmarksList, Tags, userId }) {
  // States
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredBookmarks, setFilteredBookmarks] = useState(BookmarksList);

  const handleClickTag = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (selectedTag !== "All") {
      setFilteredBookmarks(
        BookmarksList.filter((el) => el.tag === selectedTag)
      );
    } else {
      setFilteredBookmarks(BookmarksList);
    }
  }, [selectedTag]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {Tags.map((tag, id) => {
            return (
              <div key={id} onClick={() => handleClickTag(tag)}>
                <Tag state={selectedTag === tag ? "Active" : "Unactive"}>
                  {tag}
                </Tag>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          {filteredBookmarks.map((el, id) => {
            return <Post key={id} userId={userId} post={el.post} />;
          })}
        </div>
      </div>
    </>
  );
}
