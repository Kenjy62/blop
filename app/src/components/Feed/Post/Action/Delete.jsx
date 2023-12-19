// Icons
import { RxTrash } from "react-icons/rx";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";
import useDateDiff from "@/app/src/hooks/useDateDiff";

// Features
import { DeletePost } from "@/app/src/features/post";

export default function Delete({ post, userId }) {
  const isDeleteable = useDateDiff(post.createdAt);

  const actionDelete = async () => {
    const dateDiff = useDateDiff(post.createdAt);

    if (dateDiff < 5) {
      const response = await DeletePost(post.id);
      if (response.status === 400) {
        toast(<ToastError message={response.message} />, {
          position: "bottom-left",
          style: {
            background: "transparent",
            boxShadow: "none",
            border: "none",
          },
        });
      }
    } else {
      toast(<ToastError message={"Post is too old for delete!"} />, {
        position: "bottom-left",
        style: { background: "transparent" },
      });
    }
  };

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

  if (isDeleteable < 5 && userId === post.author.id) {
    return (
      <span onClick={actionDelete} className={hover}>
        <RxTrash />
      </span>
    );
  } else {
    return null;
  }
}
