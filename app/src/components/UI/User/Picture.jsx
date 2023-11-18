// Required
import Image from "next/image";
import Link from "next/link";

export default function Picture({ name, url, style, link }) {
  if (link) {
    return (
      <Link href={`/User/${name}`}>
        <Image
          src={url}
          alt={`${name}'s Picture`}
          height={300}
          width={300}
          className={style}
        />
      </Link>
    );
  }
  return (
    <Image
      src={url}
      alt={`${name}'s Picture`}
      height={300}
      width={300}
      className={style}
    />
  );
}
