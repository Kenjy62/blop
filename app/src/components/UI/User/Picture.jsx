"use client";

// Required
import Image from "next/image";
import Link from "next/link";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function Picture({ name, url, style, link }) {
  const colorScheme = CheckColorScheme();

  var color;

  if (colorScheme === "Watermelon") {
    color = `${style} hover:border-2 hover:border-watermelon-400`;
  } else if (colorScheme === "royal-blue") {
    color = `${style} hover:border-2 hover:border-royal-blue-400`;
  } else if (colorScheme === "harlequin") {
    color = `${style} hover:border-2 hover:border-harlequin-400`;
  } else if (colorScheme === "fire-bush") {
    color = `${style} hover:border-2 hover:border-fire-bush-400`;
  } else if (colorScheme === "cinnabar") {
    color = `${style} hover:border-2 hover:border-cinnabar-400`;
  } else if (colorScheme === "purple-heart") {
    color = `${style} hover:border-2 hover:border-purple-heart-400`;
  }

  if (link) {
    return (
      <Link href={`/User/${name}`}>
        <Image
          src={url}
          alt={`${name}'s Picture`}
          height={600}
          width={600}
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
