"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { init } from "./user";
import { io } from "socket.io-client";

// Config
import { fetch } from "../config/text";

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

      const socket = io.connect("http://localhost:3001");
      const socketData = {
        from_id: sender_id,
        conversation_id: conversation_id,
      };
      socket.emit("chat_new", socketData);

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

  return init()
    .then(async ({ data }) => {
      return prisma.conversation
        .findFirst({
          where: {
            OR: [
              { participant1Id: id, participant2Id: data.id },
              { participant1Id: data.id, participant2Id: id },
            ],
          },
          select: {
            id: true,
          },
        })
        .then(async (response) => {
          if (response) {
            return {
              data: response,
              message: fetch.conversation.create.alreadyExit.message,
              status: fetch.conversation.create.alreadyExit.status,
            };
          }

          return prisma.conversation
            .create({
              data: {
                participant1Id: data.id,
                participant2Id: id,
              },
            })
            .then(async (response) => {
              return prisma.message
                .create({
                  data: {
                    content: `${data.name} à crée une conversation avec vous.`,
                    createdAt: new Date(),
                    senderId: parseInt(data.id),
                    conversationId: parseInt(response.id),
                    isRead: false,
                  },
                })
                .then(async () => {
                  return {
                    data: response,
                    message: fetch.conversation.create.success.message,
                    status: fetch.conversation.create.success.status,
                  };
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
              return {
                message: fetch.conversation.create.error.message,
                status: fetch.conversation.create.error.statut,
              };
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        message: fetch.user.init.error.message,
        status: fetch.user.init.error.status,
      };
    })
    .finally(() => prisma.$disconnect());
};
