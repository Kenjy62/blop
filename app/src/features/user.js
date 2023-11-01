"use server";

// Required
import { cookies } from "next/headers";

// Prisma
import { PrismaClient } from "@prisma/client";

export const init = async () => {
  const token = cookies().get("token")?.value;
  const prisma = new PrismaClient();
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
  return user;
};

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
