"use client";

// Components
import Picture from "../User/Picture";
import Button from "../Button/Button";

// Required
import { useTransition, useState } from "react";

// Feature
import { followUser, unfollowUser } from "@/app/src/features/user";

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
          setIsFollowed(!isFollowed);
        } else if (status === 400) {
          alert(message);
        }
      });
    } else if (setIsFollowed) {
      startTransition(async () => {
        const response = await unfollowUser(
          item.user2 ? item.user2.name : item.user1.name
        );
        setIsFollowed(!isFollowed);
      });
    }
  }

  return (
    <div className="flex flex-1 p-2 flex-row gap-4 justify-between items-center dark:bg-night-300 rounded-lg">
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
          <Button>{isFollowed ? "Unfollow" : "Follow"}</Button>
        </div>
      )}
    </div>
  );
}
