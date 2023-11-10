"use client";

// Required
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Components
import Button from "../UI/Button/Button";

export default function Cover({ cover, isMyProfil }) {
  const { name } = useParams();

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
    </div>
  );
}
