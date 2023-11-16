// Required
import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Button from "../../UI/Button/Button";
import Title from "../../UI/Title/Title";

// Features
import { CreateBookmark } from "@/app/src/features/bookmark";

export default function Bookmark({ postId }) {
  const [tag, setTag] = useState();
  const router = useRouter();

  const actionAddBookmarks = async () => {
    const response = await CreateBookmark(postId, tag);

    if (response.status === 400) {
      alert(response.message);
    }

    if (response.status === 200) {
      router.back();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full dark:text-white">
      <Title>Add To Bookmark</Title>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row gap-4">
          <label>Tag :</label>
          <input
            onChange={(e) => setTag(e.target.value)}
            className="w-fit"
            type="text"
            placeholder="example: 'Dev'"
          />
        </div>
        <div className="flex justify-center">
          <div onClick={actionAddBookmarks}>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
