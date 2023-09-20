"use server";

import { PrismaClient } from "@prisma/client";

export async function GetPost(id) {
  const prisma = new PrismaClient();

  const response = await prisma.blop.findFirst({
    where: {
      id: parseInt(id),
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
