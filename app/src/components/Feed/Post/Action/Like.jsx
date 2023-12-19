// Icons
import { RxHeart, RxHeartFilled } from "react-icons/rx";

// Features
import { ReactionPost } from "@/app/src/features/post";

// Required
import { useState } from "react";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function Like({ userId, post }) {
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

  const [isLike, setIsLike] = useState(
    post.userslist_likes.find(
      (reaction) => reaction.user.id === parseInt(userId)
    )
  );

  const actionReact = async (type) => {
    const { data, message, status } = await ReactionPost(post.id, type);

    if (status === 200) {
      setIsLike(!isLike);
    }
  };

  return (
    <span className={hover}>
      {isLike ? (
        <RxHeartFilled
          onClick={() => actionReact("remove")}
          className={color}
        />
      ) : (
        <RxHeart onClick={() => actionReact("add")} />
      )}
    </span>
  );
}
