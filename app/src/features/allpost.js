"use server";

import { PrismaClient } from "@prisma/client";

export async function AllPost() {
  const prisma = new PrismaClient();

  const response = await prisma.blop.findMany({
    select: {
      id: true,
      createdAt: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          picture: true,
        },
      },
      picture: true,
      reblops: true,
      likes: true,
      bookmarks: true,
      type: true,
      reblopId: true,
      Comment: true,
      UsersLikes: {
        select: {
          blopId: true,
          User: {
            select: {
              id: true,
            },
          },
        },
      },
      reblopData: {
        select: {
          id: true,
          createdAt: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
          Hashtags: true,
        },
      },
    },
  });

  return response;
}
