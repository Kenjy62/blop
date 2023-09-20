// Required
import Link from "next/link";

// Features
import { toggleReaction } from "@/app/src/features/reaction";

// Icons
import {
  RxBookmark,
  RxChatBubble,
  RxExclamationTriangle,
  RxHeart,
  RxHeartFilled,
  RxPencil1,
  RxShare1,
  RxTrash,
} from "react-icons/rx";

export default function Actions({
  postId,
  comments,
  likes,
  shares,
  bookmarks,
  UsersLikes,
}) {
  const alreadyLike = UsersLikes.find((reaction) => reaction.User.id === 2);

  return (
    <div className="flex flex-row gap-6 items-center justify-between">
      <div className="flex flex-row gap-2">
        <Link href={`?comment=${postId}`} scroll={false}>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            {comments.length} <RxChatBubble />
          </span>
        </Link>
        <Link href={`?share=${postId}`} scroll={false}>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            {shares}
            <RxShare1 />
          </span>
        </Link>
        <span className="flex flex-row gap-2 items-center cursor-pointer">
          {likes}
          {alreadyLike ? (
            <RxHeartFilled
              onClick={() => toggleReaction(postId, "remove")}
              className="text-watermelon-500"
            />
          ) : (
            <RxHeart onClick={() => toggleReaction(postId, "add")} />
          )}
        </span>
        <span className="flex flex-row gap-2 items-center cursor-pointer">
          {bookmarks} <RxBookmark />
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <span className="flex flex-row gap-2 items-center cursor-pointer">
          <RxPencil1 />
        </span>
        <span className="flex flex-row gap-2 items-center cursor-pointer">
          <RxTrash />
        </span>
        <span className="flex flex-row gap-2 items-center cursor-pointer">
          <RxExclamationTriangle />
        </span>
      </div>
    </div>
  );
}
