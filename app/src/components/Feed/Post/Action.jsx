// Required
import Link from "next/link";

// Features
import { DeletePost, ReactionPost } from "@/app/src/features/post";
import { RemoveBookmark } from "@/app/src/features/bookmark";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

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
    const { message, status } = await RemoveBookmark(postId);
    if (status === 400) {
      alert(message);
    }
  };

  const colorScheme = CheckColorScheme();

  var color;
  var hover;

  if (colorScheme === "Watermelon") {
    color = `text-watermelon-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 dark:hover:bg-watermelon-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "royal-blue") {
    color = `text-royal-blue-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 dark:hover:bg-royal-blue-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "harlequin") {
    color = `text-harlequin-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 dark:hover:bg-harlequin-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "fire-bush") {
    color = `text-fire-bush-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 dark:hover:bg-fire-bush-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "cinnabar") {
    color = `text-cinnabar-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 dark:hover:bg-cinnabar-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "purple-heart") {
    color = `text-purple-heart-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 dark:hover:bg-purple-heart-400 hover:text-white cursor-pointer`;
  }

  return (
    <div className="flex flex-row p-4 gap-6 items-center justify-between mt-[-35px]">
      <div className="flex flex-row gap-4">
        <Link href={`?comment=${postId}`} scroll={false} className={hover}>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            <RxChatBubble />
          </span>
        </Link>
        <Link href={`?share=${postId}`} scroll={false} className={hover}>
          <span className="flex flex-row gap-2 items-center cursor-pointer">
            <RxShare1 />
          </span>
        </Link>
        <span className={hover}>
          {alreadyLike ? (
            <RxHeartFilled
              onClick={() => ReactionPost(postId, "remove")}
              className={color}
            />
          ) : (
            <RxHeart onClick={() => ReactionPost(postId, "add")} />
          )}
        </span>

        {alreadyBookmarks ? (
          <span className={hover}>
            <RxBookmarkFilled
              onClick={() => deleteBookmark(postId)}
              className={color}
            />
          </span>
        ) : (
          <Link
            href={`?bookmark=${postId}`}
            className="group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 dark:hover:bg-watermelon-400 hover:text-white cursor-pointer"
          >
            <RxBookmark className="group-hover:text-white" />
          </Link>
        )}
        {isDeleteable === true && userId === postAuthorId && (
          <span onClick={actionDelete} className={hover}>
            <RxTrash />
          </span>
        )}
        <span className={hover}>
          <RxExclamationTriangle />
        </span>
      </div>
    </div>
  );
}
