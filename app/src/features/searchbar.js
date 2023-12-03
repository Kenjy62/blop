"use server";

// Required
import { PrismaClient } from "@prisma/client";

// Config
import { fetch } from "../config/text";

export const onSearch = async (data) => {
  const prisma = new PrismaClient();

  return prisma.user
    .findMany({
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
    })
    .then(async (user) => {
      return prisma.post
        .findMany({
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
        })
        .then(async (post) => {
          return { user, post };
        });
    })
    .catch((error) => {
      console.log(error);
      return false;
    })
    .finally(() => prisma.$disconnect());
};
