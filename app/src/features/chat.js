"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { init } from "./user";

export const send = async (formData, conversation_id, sender_id) => {
  const prisma = new PrismaClient();

  const { data, message, status } = await init();

  if (status === 200) {
    try {
      await prisma.message.create({
        data: {
          content: formData.get("chatarea"),
          createdAt: new Date(),
          senderId: parseInt(sender_id),
          conversationId: parseInt(conversation_id),
          isRead: false,
        },
      });

      revalidatePath(`/Message/Conversation/${conversation_id}`);
      return {
        message: "Ok",
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "nop",
        status: 400,
      };
    } finally {
      prisma.$disconnect();
    }
  } else if (status === 400) {
    return {
      message: "Nop",
      status: 400,
    };
  }
};

export const newConversation = async (id) => {
  const prisma = new PrismaClient();

  try {
    const { data, message, status } = await init();

    const response = await prisma.conversation.findFirst({
      where: {
        OR: [
          { participant1Id: id, participant2Id: data.id },
          { participant1Id: data.id, participant2Id: id },
        ],
      },
      select: {
        id: true,
      },
    });

    if (response) {
      return { data: response, message: "already", status: 200 };
    }

    const newConv = await prisma.conversation.create({
      data: {
        participant1Id: data.id,
        participant2Id: id,
      },
    });

    await prisma.message.create({
      data: {
        content: `${data.name} à crée une conversation avec vous.`,
        createdAt: new Date(),
        senderId: parseInt(data.id),
        conversationId: parseInt(newConv.id),
        isRead: false,
      },
    });

    return { data: newConv, message: "create", status: 200 };
  } catch (error) {
    console.log(error);
    return {
      message: "nop",
      status: 400,
    };
  } finally {
    prisma.$disconnect();
  }
};
