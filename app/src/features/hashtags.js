"use server";

import { PrismaClient } from "@prisma/client";

export async function Hashtags() {
  const prisma = new PrismaClient();

  const response = await prisma.hashtags.findMany();

  const hashtagCounts = [];

  response.forEach((content) => {
    const hashtag = content.content;
    if (!hashtagCounts[hashtag]) {
      hashtagCounts[hashtag] = 1;
    } else {
      hashtagCounts[hashtag]++;
    }
  });

  const sortedHashtags = Object.entries(hashtagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return sortedHashtags;
}
