"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const setIsRead = async (id) => {
  const prisma = new PrismaClient();

  return prisma.notification
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        isRead: 1,
      },
    })
    .then(async () => {
      revalidateTag("notifications");
    })
    .catch((error) => {
      console.log(error);
      return false;
    })
    .finally(() => prisma.$disconnect());
};
