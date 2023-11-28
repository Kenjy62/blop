// Required
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// Components
import Title from "../../UI/Title/Title";
import Button from "../../UI/Button/Button";
import { ToastError, ToastSuccess } from "../../UI/Toast/Toasts";

// Features
import { SharePost } from "@/app/src/features/post";

// Toast
import toast from "react-hot-toast";

export default function Share({ postId }) {
  const router = useRouter();

  const [textarea, setTextarea] = useState();
  let [isPending, startTransition] = useTransition(); // SA transition

  // Share Post
  const Sharing = (textarea, postId, type) => {
    startTransition(async () => {
      const { message, status } = await SharePost(textarea, null, type, postId);
      if (status === 200) {
        router.back();
        toast(<ToastSuccess message={message} />, {
          position: "bottom-left",
          style: {
            background: "transparent",
            boxShadow: "none",
            border: "none",
          },
        });
      }

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
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-night-300 rounded-lg p-4">
      <Title>Share a post</Title>
      <textarea
        onChange={(e) => setTextarea(e.target.value)}
        className="w-full resize-none outline-none dark:bg-night-400 p-2 rounded-lg dark:text-white"
        type="text"
        placeholder="U can't add message or just share a post..."
      />
      <div
        className="flex justify-end"
        onClick={() => Sharing(textarea, postId, "share")}
      >
        <Button>{isPending ? "Loading.." : "Share a post"}</Button>
      </div>
    </div>
  );
}
