// Required
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

// Context
import { PopupContext } from "@/app/src/context/popup";

// Components
import Button from "../../UI/Button/Button";
import Title from "../../UI/Title/Title";
import { ToastError } from "../../UI/Toast/Toasts";
import CloseButton from "../CloseButton";

// Features
import { ReplyToPost } from "@/app/src/features/post";

// Toast
import toast from "react-hot-toast";

export default function Reply({ postId }) {
  const { togglePopup } = useContext(PopupContext);

  const [textarea, setTextarea] = useState();
  const router = useRouter();
  const pathname = usePathname();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Send Post
  const Reply = (textarea, postId) => {
    startTransition(async () => {
      const { message, status } = await ReplyToPost(textarea, postId);

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
        if (pathname !== `/Post/${postId}`) {
          togglePopup();
          router.push(`/Post/${postId}`);
        } else {
          togglePopup();
          router.refresh();
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 z-50 bg-white dark:bg-night-300 p-4 rounded-lg w-96">
      <div className="flex flex-row justify-between">
        <Title>Reply to post</Title>
        <CloseButton />
      </div>

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
