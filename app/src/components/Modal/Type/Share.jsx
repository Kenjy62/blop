// Required
import { useState, useTransition } from "react";

// Components
import Button from "../../UI/Button/Button";

// Features
import { SharePost } from "@/app/src/features/post";
import Title from "../../UI/Title/Title";

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
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
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
