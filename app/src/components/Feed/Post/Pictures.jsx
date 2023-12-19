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
        <div className="flex-1" key={id}>
          <Link
            href={`#`}
            scroll={false}
            shallow={false}
            onClick={() => togglePopup("media", pic.url)}
          >
            <Image
              className="rounded-lg w-full"
              src={pic.url}
              width={1920}
              height={1080}
              alt={`post picture`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
