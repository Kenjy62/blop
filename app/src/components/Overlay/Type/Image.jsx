// Required
import Image from "next/image";

export default function ImageLoader({ url }) {
  return (
    <Image
      alt={"Post Image"}
      src={`/Posts/${url}`}
      height={1080}
      width={1920}
      className="w-full h-full object-cover object-center rounded-lg"
    />
  );
}
