"use server";

import { PrismaClient } from "@prisma/client";

export async function GetUserRepost(name) {
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });

  const response = prisma.blop.findMany({
    where: {
      authorId: parseInt(user.id),
      type: "share",
    },
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
      Hashtags: true,
      Comment: {
        select: {
          id: true,
          message: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
        },
      },
      UsersLikes: {
        select: {
          blopId: true,
          User: {
            select: {
              id: true,
              name: true,
              picture: true,
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
