"use client";

// Required
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useColorScheme } from "@/app/src/hooks/useColorScheme";

export default function Picture({ name, url, style, link }) {
  const colorScheme = useColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `${style} hover:border-2 hover:border-watermelon-400 w-12 h-12`;
  } else if (colorScheme === "royal-blue") {
    color = `${style} hover:border-2 hover:border-royal-blue-400 w-12 h-12`;
  } else if (colorScheme === "harlequin") {
    color = `${style} hover:border-2 hover:border-harlequin-400 w-12 h-12`;
  } else if (colorScheme === "fire-bush") {
    color = `${style} hover:border-2 hover:border-fire-bush-400 w-12 h-12`;
  } else if (colorScheme === "cinnabar") {
    color = `${style} hover:border-2 hover:border-cinnabar-400 w-12 h-12`;
  } else if (colorScheme === "purple-heart") {
    color = `${style} hover:border-2 hover:border-purple-heart-400 w-12 h-12`;
  }

  if (link) {
    return (
      <Link href={`/User/${name}`} className="w-12 h-12">
        <Image
          src={url}
          alt={`${name}'s Picture`}
          height={60}
          width={60}
          className={color}
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
