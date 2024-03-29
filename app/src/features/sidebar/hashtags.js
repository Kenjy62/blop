"use server";

// Required
import { PrismaClient } from "@prisma/client";

// Config
import { fetch } from "../../config/text";
import { config } from "../../config/config";

export async function GetTopHashtags() {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.hashtags.findMany();

    const hashtagCounts = [];

    response.forEach((content) => {
      const hashtag = content.content.toLowerCase();
      if (!hashtagCounts[hashtag]) {
        hashtagCounts[hashtag] = 1;
      } else {
        hashtagCounts[hashtag]++;
      }
    });

    const sortedHashtags = Object.entries(hashtagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, config.hashtags.limit);

    return {
      data: sortedHashtags,
      message: fetch.sidebar.tophashtags.success.message,
      status: fetch.sidebar.tophashtags.success.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: fetch.sidebar.tophashtags.error.message,
      status: fetch.sidebar.tophashtags.error.status,
    };
  } finally {
    prisma.$disconnect();
  }
}
