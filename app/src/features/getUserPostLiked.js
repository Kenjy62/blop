"use server";

import { PrismaClient } from "@prisma/client";

export async function GetUserPostLiked(name) {
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });

  const response = await prisma.blop.findMany({
    where: {
      UsersLikes: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      Comment: {
        select: {
          id: true,
          message: true,
          author: {
            select: {
              id: true,
              picture: true,
              name: true,
            },
          },
          createdAt: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          picture: true,
        },
      },
      UsersLikes: {
        select: {
          User: {
            select: {
              id: true,
            },
          },
        },
      },
      Bookmarks: {
        select: {
          userId: true,
          postId: true,
        },
      },
      reblopData: {
        select: {
          id: true,
          content: true,
          picture: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              picture: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return response;
}
