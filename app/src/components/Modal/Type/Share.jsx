// Required
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// Components
import Button from "../../UI/Button/Button";

// Features
import { SharePost } from "@/app/src/features/post";
import Title from "../../UI/Title/Title";

// Toast
import toast from "react-hot-toast";
import { ToastSuccess } from "../../UI/Toast/Toasts";

export default function Share({ postId }) {
  const [textarea, setTextarea] = useState();

  const router = useRouter();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Share Post
  const Sharing = (textarea, postId, type) => {
    startTransition(async () => {
      const { message, status } = await SharePost(textarea, null, type, postId);
      if (status === 200) {
        router.back();
        toast(<ToastSuccess message={message} />, {
          position: "bottom-left",
          style: { background: "transparent" },
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
