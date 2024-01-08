"use client";

// Components
import Picture from "../User/Picture";
import Button from "../Button/Button";

// Required
import { useTransition, useState } from "react";

// Feature
import { followUser, unfollowUser } from "@/app/src/features/user";
import { ToastSuccess, ToastError } from "../Toast/Toasts";

// Toast
import toast from "react-hot-toast";

export default function FollowCard({ item, isMyProfil }) {
  const [isFollowed, setIsFollowed] = useState(item.user2 ? true : false);

  let [isPending, startTransition] = useTransition();

  async function follow() {
    if (!isFollowed) {
      startTransition(async () => {
        const { message, status } = await followUser(
          item.user2 ? item.user2.name : item.user1.name
        );

        if (status === 200) {
          toast(<ToastSuccess message={message} />, {
            position: "bottom-left",
            style: {
              background: "transparent",
              boxShadow: "none",
              border: "none",
            },
          });
          setIsFollowed(!isFollowed);
        }

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
      });
    } else if (isFollowed) {
      startTransition(async () => {
        const { message, status } = await unfollowUser(
          item.user2 ? item.user2.name : item.user1.name
        );

        if (status === 200) {
          setIsFollowed(!isFollowed);
          toast(<ToastSuccess message={message} />, {
            position: "bottom-left",
            style: {
              background: "transparent",
              boxShadow: "none",
              border: "none",
            },
          });
        }

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
      });
    }
  }

  return (
    <div className="flex w-full md:w-[calc(50%-16px)] p-4 flex-row gap-4 justify-between items-center dark:bg-night-300 bg-light-100 md:rounded-lg">
      <div className="flex flex-row gap-4 items-center">
        <Picture
          name={item.user2 ? item.user2?.name : item.user1.name}
          url={item.user2 ? item.user2?.picture : item.user1.picture}
          style="rounded-full cursor-pointer h-14 w-14 object-cover"
          link={true}
        />
        {item.user2 ? item.user2.name : item.user1.name}
      </div>
      {item.user2 && isMyProfil && (
        <div onClick={follow}>
          <Button>
            {isPending ? "Loading..." : isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>
      )}
    </div>
  );
}
