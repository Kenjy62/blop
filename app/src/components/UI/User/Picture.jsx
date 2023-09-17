// Required
import Image from "next/image";

export default function Picture({ name, url }) {
  return (
    <Image
      src={url}
      alt={`${name}'s Picture`}
      height={40}
      width={40}
      className="rounded-full"
    />
  );
}
