"use client";

// Required
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";

// Components
import Button from "../UI/Button/Button";

// Features
import { followUser, unfollowUser } from "../../features/user";

export default function Cover({ cover, isMyProfil, isFollowed }) {
  const { name } = useParams();
  const [alreadyFollow, setAlreadyFollow] = useState(
    isFollowed.length > 0 ? true : false
  );

  let [isPending, startTransition] = useTransition();

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
        const response = await unfollowUser(name);
        setAlreadyFollow(!alreadyFollow);
      });
    }
  }

  return (
    <div className={`h-64 rounded-lg w-full bg-red-200 relative`}>
      <Image
        src={cover}
        height={800}
        width={800}
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
        <div className="absolute top-4 right-4">
          <div onClick={follow}>
            <Button>
              {isPending ? "Loading.." : alreadyFollow ? "Unfollow" : "Follow"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
