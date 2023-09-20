"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function SharePost(textarea, files, type, postId) {
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
    content: textarea ? textarea : "",
    authorId: user.id,
    createdAt: new Date(),
    likes: 0,
    reblops: 0,
    bookmarks: 0,
    type: "share",
    updatedAt: new Date(),
    reblopId: parseInt(postId),
  };

  await prisma.blop.create({ data });

  revalidatePath("/Feed");
  return true;
}
