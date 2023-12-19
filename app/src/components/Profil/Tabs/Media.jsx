// Required
import Link from "next/link";
import Image from "next/image";

export default function Media({ data }) {
  return (
    data.length > 0 &&
    data.map((post) => {
      return post.picture.map((item, id) => {
        return (
          <Link
            key={id}
            href={`/Post/${post.id}`}
            className="w-[calc(100%/4-12px)]"
          >
            <Image
              className="rounded-lg border dark:border-night-200 shadow-md"
              src={item.url}
              height={500}
              width={500}
              alt={`Post Picture`}
            />
          </Link>
        );
      });
    })
  );
}
