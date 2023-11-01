// Required
import Link from "next/link";

// Features
import { toggleReaction } from "@/app/src/features/reaction";
import { deletePost } from "@/app/src/features/deletePost";
import { RemoveFromBookmarks } from "@/app/src/features/Bookmarks";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Icons
import {
  RxBookmark,
  RxBookmarkFilled,
  RxChatBubble,
  RxExclamationTriangle,
  RxHeart,
  RxHeartFilled,
  RxShare1,
  RxTrash,
} from "react-icons/rx";

export default function Actions({
  userId,
  postId,
  postAuthorId,
  comments,
  likes,
  shares,
  UsersLikes,
  UsersBookmarks,
  isDeleteable,
  createdAt,
  Bookmarks,
}) {
  const alreadyLike = UsersLikes.find(
    (reaction) => reaction.User.id === parseInt(userId)
  );

  const alreadyBookmarks = UsersBookmarks.find(
    (user) => user.userId === userId
  );

  const actionDelete = async () => {
    const now = dayjs();
    const dateDiff = now.diff(createdAt, "minute");

    if (dateDiff < 5) {
      const response = await deletePost(postId);
      if (response.status === 400) {
        alert(response.message);
      }
    } else {
      alert("Post is too old for delete!");
    }
  };

  const RemoveBookmark = async (postId) => {
    const response = await RemoveFromBookmarks(postId);
    if (response.status === 200) {
      alert("Delete");
    } else {
      alert("error");
    }
  };

  return (
    <div className="flex flex-row gap-6 items-center justify-between">
      <div className="flex flex-row gap-2">
        <Link href={`?comment=${postId}`} scroll={false}>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            <RxChatBubble /> {comments.length}
          </span>
        </Link>
        <Link href={`?share=${postId}`} scroll={false}>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            <RxShare1 /> {shares}
          </span>
        </Link>
        <span className="flex flex-row gap-2 items-center cursor-pointer">
          {alreadyLike ? (
            <RxHeartFilled
              onClick={() => toggleReaction(postId, "remove")}
              className="text-watermelon-500"
            />
          ) : (
            <RxHeart onClick={() => toggleReaction(postId, "add")} />
          )}
          {likes}
        </span>

        {alreadyBookmarks ? (
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            <RxBookmarkFilled
              onClick={() => RemoveBookmark(postId)}
              className="text-watermelon-500"
            />
          </span>
        ) : (
          <Link href={`?bookmark=${postId}`}>
            <RxBookmark />
          </Link>
        )}
        {Bookmarks}
      </div>
      <div className="flex flex-row gap-2">
        {isDeleteable === true && userId === postAuthorId && (
          <span
            onClick={actionDelete}
            className="flex flex-row gap-2 items-center cursor-pointer"
          >
            <RxTrash />
          </span>
        )}
        <span className="flex flex-row gap-2 items-center cursor-pointer">
          <RxExclamationTriangle />
        </span>
      </div>
    </div>
  );
}
