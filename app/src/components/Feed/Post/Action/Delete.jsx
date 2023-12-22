// Required
import { useTransition } from "react";

// Icons
import { RxTrash } from "react-icons/rx";

// Hooks
import { useColorScheme } from "@/app/src/hooks/useColorScheme";
import useDateDiff from "@/app/src/hooks/useDateDiff";

// Features
import { DeletePost } from "@/app/src/features/post";

// Components
import { ToastError } from "../../../UI/Toast/Toasts";
import { BounceLoader } from "react-spinners";

// Toast
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Delete({ post, userId }) {
  const isDeleteable = useDateDiff(post.createdAt);
  const dateDiff = useDateDiff(post.createdAt);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const actionDelete = async () => {
    startTransition(async () => {
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
          router.refresh();
        }
      } else {
        toast(<ToastError message={"Post is too old for delete!"} />, {
          position: "bottom-left",
          style: { background: "transparent" },
        });
      }
    });
  };

  const colorScheme = useColorScheme();

  var color;
  var hover;
  var transitionColor;

  if (colorScheme === "Watermelon") {
    color = `text-watermelon-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-watermelon-400 dark:hover:bg-watermelon-400 hover:text-white cursor-pointer`;
    transitionColor = "#fb5875";
  } else if (colorScheme === "royal-blue") {
    color = `text-royal-blue-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-royal-blue-400 dark:hover:bg-royal-blue-400 hover:text-white cursor-pointer`;
    transitionColor = "#61b0f9";
  } else if (colorScheme === "harlequin") {
    color = `text-harlequin-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-harlequin-400 dark:hover:bg-harlequin-400 hover:text-white cursor-pointer`;
    transitionColor = "#59e925";
  } else if (colorScheme === "fire-bush") {
    color = `text-fire-bush-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-fire-bush-400 dark:hover:bg-fire-bush-400 hover:text-white cursor-pointer`;
    transitionColor = "#efb230";
  } else if (colorScheme === "cinnabar") {
    color = `text-cinnabar-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-cinnabar-400 dark:hover:bg-cinnabar-400 hover:text-white cursor-pointer`;
    transitionColor = "#ff6868";
  } else if (colorScheme === "purple-heart") {
    color = `text-purple-heart-400 group-hover:text-white`;
    hover = `group w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-night-200 hover:bg-purple-heart-400 dark:hover:bg-purple-heart-400 hover:text-white cursor-pointer`;
    transitionColor = "#9d82ff";
  }

  if (isDeleteable < 5 && userId === post.author.id) {
    return !isPending ? (
      <span onClick={actionDelete} className={hover}>
        <RxTrash />
      </span>
    ) : (
      <>
        <span className={hover}>
          <BounceLoader size={38} color={transitionColor} loading={true} />
        </span>
      </>
    );
  } else {
    return null;
  }
}
