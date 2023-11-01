"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export async function GetBookmarksTags(id) {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  const user = await prisma.user.findFirst({
    where: {
      token: token.value,
    },
    select: {
      id: true,
    },
  });

  const response = await prisma.bookmarks.findMany({
    where: {
      userId: parseInt(user.id),
    },
    select: {
      tags: true,
      post: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          content: true,
          author: {
            select: {
              name: true,
              picture: true,
              id: true,
            },
          },
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
          picture: true,
          reblops: true,
          likes: true,
          UsersLikes: {
            select: {
              User: {
                select: {
                  id: true,
                },
              },
            },
          },
          bookmarks: true,
          Bookmarks: {
            select: {
              userId: true,
              postId: true,
            },
          },
          type: true,
        },
      },
    },
  });

  const test = { response, user };

  return test;
}
