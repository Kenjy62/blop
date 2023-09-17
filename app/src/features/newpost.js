"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function NewPost() {
  const prisma = new PrismaClient();

  const data = {
    content: "Hello World!",
    authorId: 1, // ID de l'utilisateur (1 dans cet exemple)
    createdAt: new Date(),
    likes: 0,
    reblops: 0,
    bookmarks: 0,
    type: "blop",
    picture: null,
    updatedAt: new Date(),
  };

  await prisma.blop.create({ data });

  revalidatePath("/");
  return true;
}
