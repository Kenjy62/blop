// Required
import Image from "next/image";
import Link from "next/link";

export default function Pictures({ post }) {
  return (
    <div className="flex flex-row gap-2">
      {post.picture.map((pic, id) => (
        <div className="flex-1" key={id}>
          <Link href={`?picture=${pic.url.replace("/Posts/", "")}`}>
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
