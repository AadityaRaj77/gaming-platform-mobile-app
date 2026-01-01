import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
  });

  return io;
};
