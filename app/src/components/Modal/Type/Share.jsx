// Required
import { useState, useTransition } from "react";

// Components
import Button from "../../UI/Button/Button";

// Features
import { SharePost } from "@/app/src/features/post";

export default function Share({ postId }) {
  const [textarea, setTextarea] = useState();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Share Post
  const Sharing = (textarea, postId, type) => {
    startTransition(async () => {
      SharePost(textarea, null, type, postId);
    });
  };

  return (
    <>
      <textarea
        onChange={(e) => setTextarea(e.target.value)}
        className="w-full resize-none outline-none dark:bg-night-300"
        type="text"
        placeholder="U can't add message or just share a post..."
      />
      <div
        className="flex justify-end"
        onClick={() => Sharing(textarea, postId, "share")}
      >
        <Button>{isPending ? "Loading.." : "Share"}</Button>
      </div>
    </>
  );
}
