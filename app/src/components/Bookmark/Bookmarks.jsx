"use client";

// Required
import { useEffect, useState } from "react";

// Components
import Post from "../Feed/Post/Post";
import Tag from "../UI/Tag/Tag";

export default function Bookmarks({ BookmarksList, Tags, userId }) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredBookmarks, setFilteredBookmarks] = useState(BookmarksList);

  const handleClickTag = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    if (selectedTag !== "All") {
      setFilteredBookmarks(
        BookmarksList.filter((el) => el.tags === selectedTag)
      );
    } else {
      setFilteredBookmarks(BookmarksList);
    }
  }, [selectedTag]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {Tags.map((tag) => (
            <div onClick={() => handleClickTag(tag)}>
              <Tag
                key={tag}
                state={selectedTag === tag ? "Active" : "Unactive"}
              >
                {tag}
              </Tag>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {filteredBookmarks.map((el) => {
            return <Post key={el.id} userId={userId} post={el.post} />;
          })}
        </div>
      </div>
    </>
  );
}
