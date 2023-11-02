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
        prisma.$disconnect;
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
        prisma.$disconnect;
      }
    }
  }
}

// Login User
export async function Login(formData) {
  const prisma = new PrismaClient();

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

  if (response) {
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
    prisma.$disconnect;
    return token;
  } else {
    return null;
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
      },
    });
    return {
      data: user,
      message: fetch.user.init.success.message,
      status: fetch.user.init.success.status,
    };
  } catch (error) {
    return {
      message: fetch.user.init.error.message,
      status: fetch.user.init.error.status,
    };
  } finally {
    prisma.$disconnect;
  }
};

// Update User Avatar
export const UpdateAvatar = async (filename) => {
  const me = await init();

  const prisma = new PrismaClient();

  try {
    await prisma.user.update({
      where: {
        id: parseInt(me.id),
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
  const me = await init();

  const prisma = new PrismaClient();

  try {
    await prisma.user.update({
      where: {
        id: parseInt(me.id),
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
  const me = await init();
  const prisma = new PrismaClient();

  if (type === "Like") {
    const defaultValue = await prisma.user.findFirst({
      where: { id: me.id },
      select: { like_notification: true },
    });

    await prisma.user.update({
      where: {
        id: me.id,
      },
      data: {
        like_notification: defaultValue.like_notification === 0 ? 1 : 0,
      },
    });
  } else if (type === "Comment") {
    const defaultValue = await prisma.user.findFirst({
      where: { id: me.id },
      select: { comment_notification: true },
    });

    await prisma.user.update({
      where: {
        id: me.id,
      },
      data: {
        comment_notification: defaultValue.comment_notification === 0 ? 1 : 0,
      },
    });
  } else if (type === "Message") {
    const defaultValue = await prisma.user.findFirst({
      where: { id: me.id },
      select: { message_notification: true },
    });

    await prisma.user.update({
      where: {
        id: me.id,
      },
      data: {
        message_notification: defaultValue.message_notification === 0 ? 1 : 0,
      },
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

    const response = await prisma.blop.findMany({
      where: {
        authorId: parseInt(user.id),
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
            postId: true,
            userId: true,
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
      message: fetch.post.getUserPosts.success.message,
      status: fetch.post.getUserPosts.success.status,
    };
  } catch (error) {
    return {
      message: fetch.post.getUserPosts.error.message,
      status: fetch.post.getUserPosts.error.status,
    };
  } finally {
    prisma.$disconnect;
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

    const response = await prisma.blop.findMany({
      where: {
        UsersLikes: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        Comment: {
          select: {
            id: true,
            message: true,
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
        UsersLikes: {
          select: {
            User: {
              select: {
                id: true,
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
    prisma.$disconnect;
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

    const response = await prisma.blop.findMany({
      where: {
        authorId: parseInt(user.id),
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
        reblops: true,
        likes: true,
        bookmarks: true,
        type: true,
        Hashtags: true,
        Bookmarks: {
          select: {
            userId: true,
            postId: true,
          },
        },
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
      message: fetch.user.post.get.shared.success.message,
      status: fetch.user.post.get.shared.success.status,
    };
  } catch {
    return {
      message: fetch.user.post.get.shared.error.message,
      status: fetch.user.post.get.shared.error.status,
    };
  } finally {
    prisma.$disconnect;
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
        posts: {
          select: { id: true, type: true, picture: true },
        },
        Comment: {
          select: { id: true },
        },
        BlopsLiked: {
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
    return {
      message: fetch.user.get.error.message,
      status: fetch.user.get.error.status,
    };
  } finally {
    prisma.$disconnect;
  }
}
