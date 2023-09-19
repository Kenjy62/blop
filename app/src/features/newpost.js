"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function NewPost(textarea, files) {
  const prisma = new PrismaClient();

  const hashtags = extractHashtags(textarea);

  const data = {
    content: textarea.toString(),
    authorId: 1, // ID de l'utilisateur (1 dans cet exemple)
    createdAt: new Date(),
    likes: 0,
    reblops: 0,
    bookmarks: 0,
    type: "blop",
    picture: files ? "https://picsum.photos/800" : null,
    updatedAt: new Date(),
    Hashtags: {
      create: hashtags.map((tag) => ({
        content: tag,
      })),
    },
  };

  await prisma.blop.create({ data });

  revalidatePath("/Feed");
  return true;
}

function extractHashtags(text) {
  const regex = /#(\w+)/g;
  const hashtags = text.match(regex);

  // Si des hashtags sont trouvés, renvoie-les dans un tableau, sinon renvoie un tableau vide
  return hashtags ? hashtags : [];
}
