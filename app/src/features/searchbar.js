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
      return prisma.hashtags
        .findMany({
          where: {
            content: {
              contains: data,
            },
          },
          select: {
            post: {
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
            },
          },
          skip: 0,
          take: 10,
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
