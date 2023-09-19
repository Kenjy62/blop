// Required
import { useState } from "react";

// Components
import Button from "../../UI/Button/Button";

// Features
import { ReplyToPost } from "@/app/src/features/reply";

export default function Reply({ postId }) {
  const [textarea, setTextarea] = useState();

  return (
    <>
      <textarea
        onChange={(e) => setTextarea(e.target.value)}
        className="w-full resize-none"
        type="text"
        placeholder="Write your response here.."
      />
      <div
        className="flex justify-end"
        onClick={() => ReplyToPost(textarea, postId)}
      >
        <Button>Send</Button>
      </div>
    </>
  );
}
