"use server";

// TODO: Create bookmark table in database

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

import { fetch } from "../config/config";
import { revalidatePath } from "next/cache";

export async function AddToBookmark(postId, tag) {
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
    userId: parseInt(user.id),
    postId: parseInt(postId),
    tags: tag,
  };

  try {
    await prisma.bookmarks.create({ data });

    await prisma.blop.update({
      where: { id: parseInt(postId) },
      data: { bookmarks: { increment: 1 } },
    });

    revalidatePath("/Feed");
    return {
      message: fetch.bookmark.success.message,
      status: fetch.bookmark.success.status,
    };
  } catch (e) {
    return {
      message: fetch.bookmark.error.message,
      status: fetch.bookmark.error.status,
    };
  }
}

export async function RemoveFromBookmarks(postId) {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  const user = await prisma.user.findFirst({
    where: { token: token.value },
  });

  try {
    await prisma.bookmarks.deleteMany({
      where: {
        AND: [{ userId: user.id }, { postId: postId }],
      },
    });

    await prisma.blop.update({
      where: { id: parseInt(postId) },
      data: { bookmarks: { decrement: 1 } },
    });
    revalidatePath("/Feed");
    return { message: "Ok", status: 200 };
  } catch (error) {
    return { message: "error", status: 400 };
  }
}
