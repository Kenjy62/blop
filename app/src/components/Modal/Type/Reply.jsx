// Required
import { useState, useTransition } from "react";

// Components
import Button from "../../UI/Button/Button";
import Title from "../../UI/Title/Title";
import { ToastError } from "../../UI/Toast/Toasts";

// Features
import { ReplyToPost } from "@/app/src/features/post";
import { useRouter } from "next/navigation";

// Toast
import toast from "react-hot-toast";

export default function Reply({ defaultTheme, postId }) {
  const [textarea, setTextarea] = useState();
  const router = useRouter();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Send Post
  const Reply = (textarea, postId) => {
    startTransition(async () => {
      const { message, status } = await ReplyToPost(textarea, postId);

      if (status === 400) {
        toast(<ToastError message={message} />, {
          position: "bottom-left",
          style: { background: "transparent" },
        });
      }

      if (status === 200) {
        router.push(`/Post/${postId}`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-night-300 p-4 rounded-lg">
      <Title>Reply to post</Title>
      <textarea
        onChange={(e) => setTextarea(e.target.value)}
        className={`dark:bg-night-400 p-2 rounded-lg dark:text-white w-full resize-none outline-none`}
        type="text"
        placeholder="Write your response here.."
      />
      <div className="flex justify-end" onClick={() => Reply(textarea, postId)}>
        <Button>{isPending ? "Loading" : "Send a response"}</Button>
      </div>
    </div>
  );
}
