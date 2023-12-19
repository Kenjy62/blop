// Required
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

// Context
import { PopupContext } from "@/app/src/context/popup";

// Components
import Button from "../../UI/Button/Button";
import Title from "../../UI/Title/Title";
import { ToastError, ToastSuccess } from "../../UI/Toast/Toasts";
import CloseButton from "../../Popup/CloseButton";

// toast
import toast from "react-hot-toast";

// Features
import { CreateBookmark } from "@/app/src/features/bookmark";

export default function Bookmark({ postId }) {
  const [tag, setTag] = useState();
  const router = useRouter();

  const { togglePopup } = useContext(PopupContext);

  const actionAddBookmarks = async () => {
    const { message, status } = await CreateBookmark(postId, tag);

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
      toast(<ToastSuccess message={message} />, {
        position: "bottom-left",
        style: {
          background: "transparent",
          boxShadow: "none",
          border: "none",
        },
      });
      togglePopup();
    }
  };

  return (
    <div className="flex flex-col gap-4 z-50 bg-white dark:bg-night-300 p-4 rounded-lg w-96">
      <div className="flex flex-row justify-between">
        <Title>Reply to post</Title>
        <CloseButton />
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row gap-4 items-center">
          <label>Tag :</label>
          <input
            onChange={(e) => setTag(e.target.value)}
            className="w-fit dark:bg-night-400 py-1 px-2 rounded-lg"
            type="text"
            placeholder="example: 'Dev'"
          />
        </div>
        <div className="flex justify-center">
          <div onClick={actionAddBookmarks}>
            <Button>Create a bookmark</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
