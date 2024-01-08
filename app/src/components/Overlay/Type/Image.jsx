// Required
import Image from "next/image";

export default function ImageLoader({ url }) {
  return (
    <img
      alt={"Post Image"}
      src={`/Posts/${url}`}
      className="rounded-lg"
    />
  );
}
