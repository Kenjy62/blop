"use server";

// Required
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { fetch } from "../config/config";

export const ReplyToPost = async (content, postId) => {
  const prisma = new PrismaClient();

  if (content.length > 5) {
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
      message: content,
      createdAt: new Date(),
      authorId: user.id,
      blopId: parseInt(postId),
    };

    await prisma.comment.create({ data });
    return redirect(`/Post/${postId}`);
  } else {
    return {
      message: fetch.comment.create.error.message,
      status: fetch.comment.create.error.status,
    };
  }
};
