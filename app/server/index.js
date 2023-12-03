const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("userInit", async (id) => {
    const prisma = new PrismaClient();

    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          socket: socket.id,
        },
      });
      prisma.$disconnect();
      console.log(`User with id : ${id} socket update in database`);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("post_comment", async (socketData) => {
    console.log(
      `UserID : ${socketData.userid} comment PostID: ${socketData.post_id}`
    );

    const prisma = new PrismaClient();
    try {
      // Find Post
      const response = await prisma.post.findFirst({
        where: { id: parseInt(socketData.post_id) },
        select: {
          author: {
            select: {
              id: true,
              socket: true,
            },
          },
        },
      });

      if (socketData.userid === response.author.id) {
        return;
      }

      // Create notification
      const notif = await prisma.notification.create({
        data: {
          type: "comment",
          from: socketData.userid,
          for_id: response.author.id,
          isRead: 0,
          post_id: parseInt(socketData.post_id),
          createdAt: new Date(),
        },
      });

      const thisNotif = await prisma.notification.findFirst({
        where: {
          id: parseInt(notif.id),
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
          Conversation: {
            select: {
              id: true,
            },
          },
          Post: {
            select: {
              id: true,
            },
          },
        },
      });

      // Send io to user
      io.to(response.author.socket).emit("new_notification", thisNotif);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("post_share", async (socketData) => {
    console.log(
      `UserID : ${socketData.userid} share PostID: ${socketData.post_id}`
    );

    const prisma = new PrismaClient();
    try {
      // Find Post
      const response = await prisma.post.findFirst({
        where: { id: parseInt(socketData.post_id) },
        select: {
          author: {
            select: {
              id: true,
              socket: true,
            },
          },
        },
      });

      if (socketData.userid === response.author.id) {
        return;
      }

      // Create notification
      const notif = await prisma.notification.create({
        data: {
          type: "share",
          from: socketData.userid,
          for_id: response.author.id,
          isRead: 0,
          post_id: parseInt(socketData.post_id),
          createdAt: new Date(),
        },
      });

      const thisNotif = await prisma.notification.findFirst({
        where: {
          id: parseInt(notif.id),
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
          Conversation: {
            select: {
              id: true,
            },
          },
          Post: {
            select: {
              id: true,
            },
          },
        },
      });

      // Send io to user
      io.to(response.author.socket).emit("new_notification", thisNotif);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("post_like", async (socketData) => {
    console.log(
      `UserID : ${socketData.userid} like PostID: ${socketData.post_id}`
    );

    const prisma = new PrismaClient();
    try {
      // Find Post
      const response = await prisma.post.findFirst({
        where: { id: parseInt(socketData.post_id) },
        select: {
          author: {
            select: {
              id: true,
              socket: true,
            },
          },
        },
      });

      if (response.author.id === socketData.userid) {
        return;
      }

      // Create notification
      const notif = await prisma.notification.create({
        data: {
          type: "like",
          from: socketData.userid,
          for_id: response.author.id,
          isRead: 0,
          post_id: parseInt(socketData.post_id),
          createdAt: new Date(),
        },
      });

      const thisNotif = await prisma.notification.findFirst({
        where: {
          id: parseInt(notif.id),
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
          Conversation: {
            select: {
              id: true,
            },
          },
          Post: {
            select: {
              id: true,
            },
          },
        },
      });

      // Send io to user
      io.to(response.author.socket).emit("new_notification", thisNotif);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("chat_new", async (socketData) => {
    console.log(
      `UserID: ${socketData.from_id} send chat to conversationID: ${socketData.conversation_id}`
    );

    const prisma = new PrismaClient();

    const conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { id: parseInt(socketData.conversation_id) },
          {
            OR: [
              { participant1Id: parseInt(socketData.from_id) },
              { participant2Id: parseInt(socketData.from_id) },
            ],
          },
        ],
      },
    });

    if (conversation.participant1Id !== socketData.from_id) {
      const user = await prisma.user.findFirst({
        where: { id: parseInt(conversation.participant1Id) },
        select: { socket: true },
      });

      const data = {
        type: "chat",
        from: parseInt(socketData.from_id),
        for_id: parseInt(conversation.participant1Id),
        conversation_id: parseInt(socketData.conversation_id),
        isRead: 0,
        createdAt: new Date(),
      };

      // Create notification
      const response = await prisma.notification.create({
        data,
      });

      const thisNotif = await prisma.notification.findFirst({
        where: {
          id: response.id,
        },
        select: {
          id: true,
          type: true,
          isRead: true,
          Conversation: {
            select: {
              id: true,
            },
          },
          author: {
            select: {
              name: true,
              id: true,
              picture: true,
            },
          },
        },
      });

      io.to(user.socket).emit("new_message");
      io.to(user.socket).emit("new_notification_message", thisNotif);
    } else {
      const user = await prisma.user.findFirst({
        where: { id: parseInt(conversation.participant2Id) },
        select: { socket: true },
      });

      // Create notification
      const notif = await prisma.notification.create({
        data: {
          type: "chat",
          from: parseInt(socketData.from_id),
          for_id: parseInt(conversation.participant2Id),
          conversation_id: parseInt(socketData.conversation_id),
          isRead: 0,
          createdAt: new Date(),
        },
      });

      io.to(user.socket).emit("new_message");
      io.to(user.socket).emit("new_notification_message", notif);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
