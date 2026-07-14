import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => io;