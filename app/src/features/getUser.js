"use server";

import { PrismaClient } from "@prisma/client";

export async function GetUser(name) {
  const prisma = new PrismaClient();

  const response = await prisma.user.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
      name: true,
      picture: true,
      cover: true,
      posts: {
        select: { id: true, type: true, picture: true },
      },
      Comment: {
        select: { id: true },
      },
      BlopsLiked: {
        select: { id: true },
      },
    },
  });

  return response;
}
