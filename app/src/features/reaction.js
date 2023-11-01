"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const toggleReaction = async (postId, value) => {
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

  const data = {
    blopId: postId,
    userId: user.id,
  };

  if (value === "add") {
    await prisma.blopsLiked.create({ data });
    await prisma.blop.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });
  }

  if (value === "remove") {
    await prisma.blopsLiked.deleteMany({
      where: {
        blopId: parseInt(postId),
        userId: parseInt(user.id),
      },
    });
    await prisma.blop.update({
      where: { id: postId },
      data: { likes: { decrement: 1 } },
    });
  }

  revalidatePath("/Feed");
};
