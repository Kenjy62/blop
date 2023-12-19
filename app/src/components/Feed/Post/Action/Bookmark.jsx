// Icons
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";

// Required
import Link from "next/link";
import { useContext } from "react";

// Context
import { PopupContext } from "@/app/src/context/popup";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

// Features
import { RemoveBookmark } from "@/app/src/features/bookmark";

// Components
import { ToastError, ToastSuccess } from "../../../UI/Toast/Toasts";

// Toast
import toast from "react-hot-toast";

export default function Bookmark({ userId, post }) {
  const alreadyBookmarks = post.bookmark_data.find(
    (user) => user.user_id === userId
  );

  const { togglePopup } = useContext(PopupContext);

  const colorScheme = CheckColorScheme();

  var color;
  var hover;

  if (colorScheme === "Watermelon") {
    color = `text-watermelon-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-watermelon-400 dark:hover:bg-watermelon-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "royal-blue") {
    color = `text-royal-blue-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-royal-blue-400 dark:hover:bg-royal-blue-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "harlequin") {
    color = `text-harlequin-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-harlequin-400 dark:hover:bg-harlequin-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "fire-bush") {
    color = `text-fire-bush-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-fire-bush-400 dark:hover:bg-fire-bush-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "cinnabar") {
    color = `text-cinnabar-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-cinnabar-400 dark:hover:bg-cinnabar-400 hover:text-white cursor-pointer`;
  } else if (colorScheme === "purple-heart") {
    color = `text-purple-heart-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-purple-heart-400 dark:hover:bg-purple-heart-400 hover:text-white cursor-pointer`;
  }

  const deleteBookmark = async () => {
    const { message, status } = await RemoveBookmark(post.id);
    if (status === 400) {
      toast(<ToastError message={message} />, {
        position: "bottom-left",
        style: {
          background: "transparent",
          boxShadow: "none",
          border: "none",
        },
      });
    }

    if (status === 200) {
      toast(<ToastSuccess message={message} />, {
        position: "bottom-left",
        style: {
          background: "transparent",
          boxShadow: "none",
          border: "none",
        },
      });
    }
  };

  return alreadyBookmarks ? (
    <span className={hover}>
      <RxBookmarkFilled
        onClick={() => deleteBookmark(post.id)}
        className={color}
      />
    </span>
  ) : (
    <Link
      href={`#`}
      shallow={false}
      scroll={false}
      onClick={() => togglePopup("bookmark", post.id)}
      className={hover}
    >
      <RxBookmark />
    </Link>
  );
}
