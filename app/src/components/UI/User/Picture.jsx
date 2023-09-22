// Required
import Image from "next/image";

export default function Picture({ name, url, height, width, border }) {
  return (
    <Image
      src={url}
      alt={`${name}'s Picture`}
      height={height}
      width={width}
      className={`rounded-full ${border}`}
    />
  );
}
