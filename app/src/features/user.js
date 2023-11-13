"use server";

// Required
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { fetch } from "../config/config";
import { writeFile } from "fs/promises";

// Prisma
import { PrismaClient } from "@prisma/client";

// Register User
export async function Register(formData) {
  const prisma = new PrismaClient();

  const ifExist = await prisma.user.findFirst({
    where: {
      OR: [
        {
          name: formData.get("name"),
        },
        { email: formData.get("email") },
      ],
    },
  });

  if (ifExist) {
    return {
      message: fetch.user.register.error.alreadyExist.message,
      status: fetch.user.register.error.status,
    };
  }

  if (!ifExist) {
    const avatar = formData.get("avatar");
    const cover = formData.get("cover");

    if (!avatar.size === 0 || !cover.size === 0) {
      try {
        await prisma.user.create({
          data: {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            picture: "/Avatars/Default.png",
            cover: "/Covers/Default.png",
          },
        });
        return {
          message: fetch.user.register.success.message,
          status: fetch.user.register.success.status,
        };
      } catch {
        return {
          message: fetch.user.register.error.message,
          status: fetch.user.register.error.status,
        };
      } finally {
        prisma.$disconnect();
      }
    }

    if (avatar.size > 0 || cover.size > 0) {
      try {
        const avatarBytes = await avatar.arrayBuffer();
        const avatarBuffer = Buffer.from(avatarBytes);

        const coverBytes = await cover.arrayBuffer();
        const coverBuffer = Buffer.from(coverBytes);

        await writeFile(
          `public/Covers/${formData.get("name")}_${cover.name}`,
          coverBuffer
        );

        await writeFile(
          `public/Avatars/${formData.get("name")}_${avatar.name}`,
          avatarBuffer
        );

        await prisma.user.create({
          data: {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            picture: `/Avatars/${formData.get("name")}_${avatar.name}`,
            cover: `/Covers/${formData.get("name")}_${cover.name}`,
          },
        });

        return {
          message: fetch.user.register.success.message,
          status: fetch.user.register.success.status,
        };
      } catch {
        return {
          message: fetch.user.register.error.message,
          status: fetch.user.register.error.status,
        };
      } finally {
        prisma.$disconnect();
      }
    }
  }
}

// Login User
export async function Login(formData) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.findFirst({
      where: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      select: {
        id: true,
        name: true,
        picture: true,
      },
    });

    const token = jwt.sign({ token: response.id }, "randomKey");
    await prisma.user.update({
      where: {
        id: response.id,
      },
      data: {
        token: token,
      },
    });
    cookies().set("token", token);
    return {
      data: token,
      message: fetch.user.login.success.message,
      status: fetch.user.login.success.status,
    };
  } catch {
    return {
      message: fetch.user.login.error.message,
      status: fetch.user.login.error.statut,
    };
  } finally {
    prisma.$disconnect();
  }
}

// Logout User
export async function Logout() {
  cookies().delete("token");
}

// Base Initialization User
export const init = async () => {
  const token = cookies().get("token")?.value;
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
      select: {
        id: true,
        name: true,
        picture: true,
        token: true,
        comment_notification: true,
        like_notification: true,
        message_notification: true,
        darkMode: true,
        // notification: true,
        notification: true,
      },
    });
    return {
      data: user,
      message: fetch.user.init.success.message,
      status: fetch.user.init.success.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: fetch.user.init.error.message,
      status: fetch.user.init.error.status,
    };
  } finally {
    prisma.$disconnect();
  }
};

// Update User Avatar
export const UpdateAvatar = async (filename) => {
  const { data } = await init();

  const prisma = new PrismaClient();

  try {
    await prisma.user.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        picture: filename,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

// Update User Cover
export const UpdateCover = async (filename) => {
  const { data } = await init();

  const prisma = new PrismaClient();

  try {
    await prisma.user.update({
      where: {
        id: parseInt(data.id),
      },
      data: {
        cover: filename,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

// Get User Notifications Settings
export const getNotificationsSettings = async () => {
  const me = await init();

  const prisma = new PrismaClient();
  const response = await prisma.user.findFirst({
    where: {
      id: me.id,
    },
    select: {
      like_notification: true,
      message_notification: true,
      comment_notification: true,
    },
  });

  return response;
};

// Update User Notifications Settings
export const updateNotificationSetting = async (type) => {
  const { data } = await init();
  const prisma = new PrismaClient();

  if (type === "Like") {
    const defaultValue = await prisma.user.findFirst({
      where: { id: data.id },
      select: { like_notification: true },
    });

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        like_notification: defaultValue.like_notification === 0 ? 1 : 0,
      },
    });
  } else if (type === "Comment") {
    const defaultValue = await prisma.user.findFirst({
      where: { id: data.id },
      select: { comment_notification: true },
    });

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        comment_notification: defaultValue.comment_notification === 0 ? 1 : 0,
      },
    });
  } else if (type === "Message") {
    const defaultValue = await prisma.user.findFirst({
      where: { id: data.id },
      select: { message_notification: true },
    });

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        message_notification: defaultValue.message_notification === 0 ? 1 : 0,
      },
    });
  } else if (type == "Dark Mode") {
    const defaultValue = await prisma.user.findFirst({
      where: { id: data.id },
      select: { darkMode: true },
    });

    await prisma.user.update({
      where: { id: data.id },
      data: { darkMode: defaultValue.darkMode === false ? true : false },
    });
  }
};

// Get User Posts
export async function GetUserPosts(name) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    });

    const response = await prisma.post.findMany({
      where: {
        author_id: parseInt(user.id),
        type: "post",
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
        shares: true,
        likes: true,
        bookmarks: true,
        type: true,
        hashtags: true,
        comments: {
          select: {
            id: true,
            content: true,
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
        userslist_likes: {
          select: {
            post_id: true,
            user: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
        bookmark_data: {
          select: {
            post_id: true,
            user_id: true,
          },
        },
        share_data: {
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
            hashtags: true,
          },
        },
      },
    });

    return {
      data: response,
      message: fetch.post.getUserPosts.success.message,
      status: fetch.post.getUserPosts.success.status,
    };
  } catch (error) {
    return {
      message: fetch.post.getUserPosts.error.message,
      status: fetch.post.getUserPosts.error.status,
    };
  } finally {
    prisma.$disconnect();
  }
}

// Get User Posts Liked
export async function GetUserPostsLiked(name) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    });

    const response = await prisma.post.findMany({
      where: {
        userslist_likes: {
          some: {
            user_id: user.id,
          },
        },
      },
      include: {
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
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        userslist_likes: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        bookmark_data: {
          select: {
            user_id: true,
            post_id: true,
          },
        },
        share_data: {
          select: {
            id: true,
            content: true,
            picture: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                picture: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      data: response,
      message: fetch.user.post.get.liked.success.message,
      status: fetch.user.post.get.liked.success.status,
    };
  } catch {
    return {
      message: fetch.user.post.get.liked.error.message,
      status: fetch.user.post.get.liked.error.status,
    };
  } finally {
    prisma.$disconnect();
  }
}

// Get User Posts Shared
export async function GetUserPostsShared(name) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    });

    const response = await prisma.post.findMany({
      where: {
        author_id: parseInt(user.id),
        type: "share",
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
        shares: true,
        likes: true,
        bookmarks: true,
        type: true,
        hashtags: true,
        bookmark_data: {
          select: {
            user_id: true,
            post_id: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
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
        userslist_likes: {
          select: {
            post_id: true,
            user: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
        share_data: {
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
            hashtags: true,
          },
        },
      },
    });

    return {
      data: response,
      message: fetch.user.post.get.shared.success.message,
      status: fetch.user.post.get.shared.success.status,
    };
  } catch {
    return {
      message: fetch.user.post.get.shared.error.message,
      status: fetch.user.post.get.shared.error.status,
    };
  } finally {
    prisma.$disconnect();
  }
}

// Get User Details
export async function GetUserDetails(name) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
        name: true,
        picture: true,
        cover: true,
        darkMode: true,
        posts: {
          select: { id: true, type: true, picture: true },
        },
        comments: {
          select: { id: true },
        },
        posts_liked: {
          select: { id: true },
        },
      },
    });
    return {
      data: response,
      message: fetch.user.get.success.message,
      status: fetch.user.get.success.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: fetch.user.get.error.message,
      status: fetch.user.get.error.status,
    };
  } finally {
    prisma.$disconnect();
  }
}

export const getNotifications = async () => {
  const me = await init();

  const prisma = new PrismaClient();

  try {
    const response = await prisma.notification.findMany({
      where: {
        for_id: parseInt(me.data.id),
      },
      select: {
        id: true,
        isRead: true,
        type: true,
        author: {
          select: {
            id: true,
            picture: true,
            name: true,
          },
        },
      },
    });

    return {
      data: response,
      message: "Ok",
      status: 200,
    };
  } catch (error) {
    return {
      message: "nop",
      status: 400,
    };
  } finally {
    prisma.$disconnect();
  }
};
