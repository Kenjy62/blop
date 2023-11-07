// TODO: Fix Delete When Post have Hashtags and when is a Shared Post
// TODO: Close Modal when Share Post

"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetch } from "../config/config";
import { HashtagsExtrator } from "./hashtagsExtractor";
import { io } from "socket.io-client";

// Get All Post List for Feed
export async function GetAllPost() {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.blop.findMany({
      select: {
        id: true,
        createdAt: true,
        content: true,
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        picture: true,
        reblops: true,
        likes: true,
        bookmarks: true,
        type: true,
        reblopId: true,
        Comment: true,
        UsersLikes: {
          select: {
            blopId: true,
            User: {
              select: {
                id: true,
              },
            },
          },
        },
        reblopData: {
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
            Hashtags: true,
          },
        },
        Bookmarks: {
          select: {
            userId: true,
            postId: true,
          },
        },
      },
    });
    return {
      data: response,
      message: fetch.post.getAll.success.message,
      status: fetch.post.getAll.success.status,
    };
  } catch (error) {
    return {
      message: fetch.post.getAll.error.message,
      status: fetch.post.getAll.error.status,
    };
  } finally {
    prisma.$disconnect;
  }
}

// Create a new Post
export async function CreatePost(textarea, files, type, postId) {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  if (token) {
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
        message: fetch.post.create.user.error.message,
        status: fetch.post.create.user.error.status,
      };
    }

    var data = null;

    if (textarea.length > 5) {
      if (type === "post") {
        const hashtags = await HashtagsExtrator(textarea);
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
      prisma.$disconnect;
      return {
        message: fetch.post.create.success.message,
        status: fetch.post.create.success.status,
      };
    } else {
      return {
        message: fetch.post.create.error.message,
        status: fetch.post.create.error.status,
      };
    }
  }
}

// Delete a Recent Post
export async function DeletePost(postId) {
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
  } finally {
    prisma.$disconnect;
  }
}

// Get a Post Details

export async function GetPostDetails(id) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.blop.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        picture: true,
        reblops: true,
        likes: true,
        bookmarks: true,
        type: true,
        Hashtags: true,
        Comment: {
          select: {
            id: true,
            message: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
        UsersLikes: {
          select: {
            blopId: true,
            User: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
        Bookmarks: {
          select: {
            userId: true,
            postId: true,
          },
        },
        reblopData: {
          select: {
            id: true,
            createdAt: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
            Hashtags: true,
          },
        },
      },
    });

    return {
      data: response,
      message: fetch.post.getDetails.success.message,
      status: fetch.post.getDetails.success.status,
    };
  } catch {
    return {
      message: fetch.post.getDetails.error.message,
      status: fetch.post.getDetails.error.status,
    };
  } finally {
    prisma.$disconnect;
  }
}

// Reaction to Post (Like/Dislike)
export const ReactionPost = async (postId, value) => {
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
  prisma.$disconnect;
};

// Share a Post
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
  prisma.$disconnect;
  return true;
}

// Reply To Post
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
    prisma.$disconnect;

    var socket = io.connect("http://localhost:3001");
    const socketData = { userid: user.id, blopid: postId };
    socket.emit("newCommentOnPost", socketData);

    return redirect(`/Post/${postId}`);
  } else {
    return {
      message: fetch.comment.create.error.message,
      status: fetch.comment.create.error.status,
    };
  }
};
