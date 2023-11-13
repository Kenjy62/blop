"use server";

import { PrismaClient } from "@prisma/client";

export const onSearch = async (data) => {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findMany({
      where: {
        name: {
          contains: data,
        },
      },
      select: {
        name: true,
        picture: true,
        cover: true,
      },
    });

    const post = await prisma.post.findMany({
      where: {
        content: {
          contains: data,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        picture: true,
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
      },
    });

    return { user, post };
  } catch (error) {
    return false;
  } finally {
    prisma.$disconnect();
  }
};
