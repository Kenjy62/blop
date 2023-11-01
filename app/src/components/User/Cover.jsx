"use client";

import Image from "next/image";
import Button from "../UI/Button/Button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Cover({ cover, isMyProfil }) {
  const { name } = useParams();

  return (
    <div className={`h-64 rounded-lg w-full bg-red-200 relative`}>
      <Image
        src={cover}
        height={256}
        width={865}
        className="w-full h-full object-cover object-center rounded-lg"
      />
      {isMyProfil && (
        <div className="absolute top-4 right-4">
          <Link href={`/Edit/${name}`}>
            <Button>Edit Profil</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
