"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { fetch } from "../config/config";

export async function deletePost(postId) {
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

  if (!user) {
    return {
      message: fetch.delete.user.error.message,
      status: fetch.delete.user.error.status,
    };
  }

  try {
    await prisma.blop.delete({
      where: {
        id: postId,
        authorId: user.id,
      },
    });

    revalidatePath("/Feed");
    return {
      message: fetch.post.delete.success.message,
      status: fetch.post.delete.success.status,
    };
  } catch (e) {
    return {
      message: fetch.post.delete.error.message,
      status: fetch.post.delete.error.status,
    };
  }
}
