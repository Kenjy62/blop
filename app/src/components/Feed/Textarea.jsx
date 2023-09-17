"use client";

// Required
import { useTransition } from "react";

// Actions
import { NewPost } from "../../features/newpost";

// Components
import Button from "@/app/src/components/UI/Button/Button";

// Icons
import { RxImage, RxPaperPlane } from "react-icons/rx";

export default function Textarea() {
  let [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="flex flex-row gap-4 items-center w-full">
        <textarea
          className="w-full border rounded-lg p-2 resize-none outline-none focus:border focus:border-watermelon-200"
          placeholder="Write a new post.."
        />
        <div className="flex flex-col gap-4">
          <RxImage />
          <div onClick={() => startTransition(NewPost)}>
            <Button>
              {isPending ? "Loading..." : <RxPaperPlane size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
