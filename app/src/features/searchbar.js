"use server";

import { PrismaClient } from "@prisma/client";

export const onSearch = async (data) => {
  const prisma = new PrismaClient();

  try {
    const user = prisma.user.findMany({
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

    return user;
  } catch (error) {
    return false;
  } finally {
    prisma.$disconnect();
  }
};
