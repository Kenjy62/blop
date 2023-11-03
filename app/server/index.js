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
      prisma.$disconnect;
      console.log(`User with id : ${id} socket update in database`);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("newLike", (data) => {
    console.log("User like a post");
  });

  socket.on("newNotification", (socketData) => {
    console.log(
      `UserID : ${socketData.userid} comment PostID: ${socketData.blopid}`
    );
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
