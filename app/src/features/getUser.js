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
    },
  });

  return response;
}
