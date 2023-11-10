"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const setIsRead = async (id) => {
  const prisma = new PrismaClient();

  try {
    await prisma.notification.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isRead: 1,
      },
    });
    return revalidateTag("notifications");
  } catch (error) {
    return false;
  } finally {
    prisma.$disconnect;
  }
};
