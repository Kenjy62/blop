// Required
import { useState, useTransition } from "react";

// Components
import Button from "../../UI/Button/Button";

// Features
import { ReplyToPost } from "@/app/src/features/post";
import { useRouter } from "next/navigation";
import Title from "../../UI/Title/Title";

export default function Reply({ defaultTheme, postId }) {
  const [textarea, setTextarea] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Send Post
  const Reply = (textarea, postId) => {
    startTransition(async () => {
      const { message, status } = await ReplyToPost(textarea, postId);

      if (status === 400) {
        setErrorMsg(message);
      }

      if (status === 200) {
        router.push(`/Post/${postId}`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg">
      {errorMsg && (
        <div className="flex justify-center text-watermelon-500">
          {errorMsg}
        </div>
      )}
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
