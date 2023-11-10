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

  socket.on("newCommentOnPost", async (socketData) => {
    console.log(
      `UserID : ${socketData.userid} comment PostID: ${socketData.blopid}`
    );

    const prisma = new PrismaClient();
    try {
      const response = await prisma.blop.findFirst({
        where: { id: parseInt(socketData.blopid) },
        select: {
          author: {
            select: {
              id: true,
              socket: true,
            },
          },
        },
      });

      await prisma.notification.create({
        data: {
          type: "comment",
          from: socketData.userid,
          for: response.author.id,
          isRead: 0,
        },
      });

      await prisma.user.update({
        where: {
          id: parseInt(response.author.id),
        },
        data: {
          comment_notification: { increment: 1 },
        },
      });

      const data = {
        postId: socketData.blopid,
        userId: socketData.userid,
        type: "comment",
      };

      io.to(response.author.socket).emit("incrementCommentNotification", data);
    } catch (error) {
      console.log(error);
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
