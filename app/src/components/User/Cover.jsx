"use client";

// Required
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// Components
import Button from "../UI/Button/Button";
import { ToastError } from "../UI/Toast/Toasts";

// Toast
import toast from "react-hot-toast";

// Features
import { followUser, unfollowUser } from "../../features/user";
import { newConversation } from "../../features/chat";

export default function Cover({ isMyProfil, isFollowed, user }) {
  const router = useRouter();

  const { name } = useParams();
  const [alreadyFollow, setAlreadyFollow] = useState(
    isFollowed.length > 0 ? true : false
  );

  let [isPending, startTransition] = useTransition();

  const [isLoading, setIsLoading] = useState(false);

  async function follow() {
    if (!alreadyFollow) {
      startTransition(async () => {
        const { message, status } = await followUser(name);

        if (status === 200) {
          setAlreadyFollow(!alreadyFollow);
        } else if (status === 400) {
          alert(message);
        }
      });
    } else if (alreadyFollow) {
      startTransition(async () => {
        await unfollowUser(name);
        setAlreadyFollow(!alreadyFollow);
      });
    }
  }

  async function createConversation(userId) {
    setIsLoading(true);
    const { data, message, status } = await newConversation(userId);

    if (status === 200) {
      router.push(`/Message/Conversation/${data.id}`);
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
      return;
    }
    setIsLoading(false);
  }

  return (
    <div className={`h-64 rounded-lg w-full relative`}>
      <Image
        src={user.cover}
        height={1080}
        width={1920}
        className="w-full h-64 object-cover object-center rounded-lg"
        alt={`${name} cover`}
      />
      {isMyProfil && (
        <div className="absolute top-4 right-4">
          <Link href={`/Edit/${name}`}>
            <Button>Edit Profil</Button>
          </Link>
        </div>
      )}
      {!isMyProfil && (
        <div className="absolute flex flex-col gap-2 top-4 right-4">
          <div onClick={follow}>
            <Button>
              {isPending ? "Loading.." : alreadyFollow ? "Unfollow" : "Follow"}
            </Button>
          </div>
          <div onClick={() => createConversation(user.id)}>
            <Button>{isLoading ? "Loading.." : "Message"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
