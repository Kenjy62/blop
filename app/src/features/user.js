"use server";

// Required
import { cookies } from "next/headers";

// Prisma
import { PrismaClient } from "@prisma/client";

export const init = async () => {
  const token = cookies().get("token")?.value;
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
    select: {
      id: true,
      name: true,
      picture: true,
      token: true,
    },
  });
  return user;
};
