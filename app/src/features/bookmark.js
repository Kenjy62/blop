// TODO: Fix when User Save a Shared Post

"use server";

// Required
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { fetch } from "../config/config";
import { revalidatePath } from "next/cache";

// Add Post to Bookmark
export async function CreateBookmark(postId, tag) {
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
    user_id: parseInt(user.id),
    post_id: parseInt(postId),
    tag: tag,
  };

  try {
    await prisma.bookmarks.create({ data });

    await prisma.post.update({
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
  } finally {
    prisma.$disconnect();
  }
}

// Remove Post from Bookmark
export async function RemoveBookmark(postId) {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  const user = await prisma.user.findFirst({
    where: { token: token.value },
  });

  try {
    await prisma.bookmarks.deleteMany({
      where: {
        AND: [{ user_id: user.id }, { post_id: postId }],
      },
    });

    await prisma.post.update({
      where: { id: parseInt(postId) },
      data: { bookmarks: { decrement: 1 } },
    });
    revalidatePath("/Feed");
    return { message: "Ok", status: 200 };
  } catch (error) {
    return { message: "error", status: 400 };
  } finally {
    prisma.$disconnect();
  }
}

// Get User Bookmarks
export async function GetUserBookmarks() {
  const prisma = new PrismaClient();
  const token = cookies().get("token");

  try {
    const user = await prisma.user.findFirst({
      where: {
        token: token.value,
      },
      select: {
        id: true,
      },
    });

    const response = await prisma.bookmarks.findMany({
      where: {
        user_id: parseInt(user.id),
      },
      select: {
        tag: true,
        post: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            content: true,
            author: {
              select: {
                name: true,
                picture: true,
                id: true,
              },
            },
            comments: {
              select: {
                id: true,
                content: true,
                author: {
                  select: {
                    id: true,
                    picture: true,
                    name: true,
                  },
                },
                createdAt: true,
              },
            },
            picture: true,
            shares: true,
            likes: true,
            userslist_likes: {
              select: {
                user: {
                  select: {
                    id: true,
                  },
                },
              },
            },
            bookmarks: true,
            bookmark_data: {
              select: {
                user_id: true,
                post_id: true,
              },
            },
            type: true,
          },
        },
      },
    });

    const test = { response, user };

    return {
      data: test,
      message: fetch.user.bookmark.get.success.message,
      status: fetch.user.bookmark.get.success.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: fetch.user.bookmark.get.error.message,
      status: fetch.user.bookmark.get.error.status,
    };
  } finally {
    prisma.$disconnect();
  }
}
