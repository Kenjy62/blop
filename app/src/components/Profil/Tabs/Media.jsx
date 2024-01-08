// Required
import Link from "next/link";
import Image from "next/image";

export default function Media({ data }) {
  return (
    data.length > 0 &&
    data.map((post, id) => {
      return (
        <Link
          key={id}
          href={`/Post/${post.post_id}`}
          className="w-[calc(100%/4-12px)]"
        >
          <Image
            className="rounded-lg border dark:border-night-200 shadow-md"
            src={post.url}
            height={500}
            width={500}
            alt={`Post Picture`}
          />
        </Link>
      );
    })
  );
}
