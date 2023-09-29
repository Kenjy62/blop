// TODO Adding increment User post, repost, likes, medias counter

"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export async function NewPost(textarea, files, type, postId) {
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

  var data = null;

  if (type === "post") {
    const hashtags = extractHashtags(textarea);
    data = {
      content: textarea.toString(),
      authorId: user.id,
      createdAt: new Date(),
      likes: 0,
      reblops: 0,
      bookmarks: 0,
      type: "post",
      picture: files ? "https://picsum.photos/800" : null,
      updatedAt: new Date(),
      Hashtags: {
        create: hashtags.map((tag) => ({
          content: tag,
        })),
      },
    };
  } else {
    data = {
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
  }

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
