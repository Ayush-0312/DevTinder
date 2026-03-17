const socket = require("socket.io");
const Message = require("../models/message");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ chatId }) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", async ({ chatId, senderId, text }) => {
      try {
        const message = await Message.create({
          chatId,
          senderId,
          text,
        });

        io.to(chatId).emit("messageReceived", {
          senderId,
          text,
          createdAt: message.createdAt,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("userTyping", { userId });
    });

    socket.on("stopTyping", ({ chatId, userId }) => {
      socket.to(chatId).emit("userStoppedTyping", { userId });
    });
  });
};

module.exports = initializeSocket;
