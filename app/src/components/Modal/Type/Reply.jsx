// Required
import { useState, useTransition } from "react";

// Components
import Button from "../../UI/Button/Button";

// Features
import { ReplyToPost } from "@/app/src/features/reply";

export default function Reply({ postId }) {
  const [textarea, setTextarea] = useState();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Send Post
  const Reply = (textarea, postId) => {
    if (textarea?.length >= 5) {
      startTransition(async () => {
        const result = await ReplyToPost(textarea, postId);
        if (result) {
          resetForm();
        }
      });
    } else {
      alert("Minimum 5 characters");
    }
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
