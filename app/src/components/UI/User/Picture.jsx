// Required
import Image from "next/image";
import Link from "next/link";

export default function Picture({ name, url, height, width, border }) {
  return (
    <Link href={`/User/${name}`}>
      <Image
        src={url}
        alt={`${name}'s Picture`}
        height={height}
        width={width}
        className={`rounded-full ${border}`}
      />
    </Link>
  );
}
