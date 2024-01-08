// Required
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

// Context
import { PopupContext } from "@/app/src/context/popup";

export default function Pictures({ post }) {
  const { togglePopup } = useContext(PopupContext);

  return (
    <div className="flex flex-row gap-2">
      {post.picture.map((pic, id) => (
        <div key={id}>
          <Link
            href={`#`}
            scroll={false}
            shallow={false}
            onClick={() => togglePopup("media", pic.url)}
            className="relative"
          >
            <Image
              className="rounded-lg w-full"
              src={pic.url}
              height={500}
              width={500}
              style={{objectFit: 'cover'}}
              alt={`post picture`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
