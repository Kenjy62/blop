// Required
import { useState, useTransition } from "react";

// Components
import Button from "../../UI/Button/Button";

// Features
import { ReplyToPost } from "@/app/src/features/post";

export default function Reply({ postId }) {
  const [textarea, setTextarea] = useState();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Send Post
  const Reply = (textarea, postId) => {
    startTransition(async () => {
      const result = await ReplyToPost(textarea, postId);

      if (result.status === 400) {
        alert(result.message);
      }

      if (result.status === 200) {
        resetForm();
      }
    });
  };

  return (
    <>
      <textarea
        onChange={(e) => setTextarea(e.target.value)}
        className="w-full resize-none outline-none"
        type="text"
        placeholder="Write your response here.."
      />
      <div className="flex justify-end" onClick={() => Reply(textarea, postId)}>
        <Button>{isPending ? "Loading" : "Send"}</Button>
      </div>
    </>
  );
}
