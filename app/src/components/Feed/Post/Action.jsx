// Required
import Link from "next/link";

// Features
import { DeletePost, ReactionPost } from "@/app/src/features/post";
import { RemoveBookmark } from "@/app/src/features/bookmark";

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
  UsersLikes,
  UsersBookmarks,
  isDeleteable,
  createdAt,
}) {
  const alreadyLike = UsersLikes.find(
    (reaction) => reaction.user.id === parseInt(userId)
  );

  const alreadyBookmarks = UsersBookmarks.find(
    (user) => user.user_id === userId
  );

  const actionDelete = async () => {
    const now = dayjs();
    const dateDiff = now.diff(createdAt, "minute");

    if (dateDiff < 5) {
      const response = await DeletePost(postId);
      if (response.status === 400) {
        alert(response.message);
      }
    } else {
      alert("Post is too old for delete!");
    }
  };

  const deleteBookmark = async (postId) => {
    const response = await RemoveBookmark(postId);
    if (response.status === 200) {
      alert("Delete");
    } else {
      alert("error");
    }
  };

  return (
    <div className="flex flex-row p-4 gap-6 items-center justify-between mt-[-35px]">
      <div className="flex flex-row gap-4">
        <Link
          href={`?comment=${postId}`}
          scroll={false}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-watermelon-400 hover:text-white cursor-pointer"
        >
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            <RxChatBubble />
          </span>
        </Link>
        <Link
          href={`?share=${postId}`}
          scroll={false}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-watermelon-400 hover:text-white cursor-pointer"
        >
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            <RxShare1 />
          </span>
        </Link>
        <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-watermelon-400 hover:text-white cursor-pointer">
          {alreadyLike ? (
            <RxHeartFilled
              onClick={() => ReactionPost(postId, "remove")}
              className="text-watermelon-500"
            />
          ) : (
            <RxHeart onClick={() => ReactionPost(postId, "add")} />
          )}
        </span>

        {alreadyBookmarks ? (
          <span className="group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-watermelon-400 hover:text-white cursor-pointer">
            <RxBookmarkFilled
              onClick={() => deleteBookmark(postId)}
              className="text-watermelon-500 group-hover:text-white"
            />
          </span>
        ) : (
          <Link
            href={`?bookmark=${postId}`}
            className="group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-watermelon-400 hover:text-white cursor-pointer"
          >
            <RxBookmark className="group-hover:text-white" />
          </Link>
        )}
        {isDeleteable === true && userId === postAuthorId && (
          <span
            onClick={actionDelete}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-watermelon-400 hover:text-white cursor-pointer"
          >
            <RxTrash />
          </span>
        )}
        <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-watermelon-400 hover:text-white cursor-pointer">
          <RxExclamationTriangle />
        </span>
      </div>
    </div>
  );
}
