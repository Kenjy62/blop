"use server";

// Required
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const ReplyToPost = async (content, postId) => {
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
    message: content,
    createdAt: new Date(),
    authorId: user.id,
    blopId: parseInt(postId),
  };

  const response = await prisma.comment.create({ data });

  redirect(`/Feed/Post/${postId}`);
};
