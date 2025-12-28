import { Server } from "socket.io";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
  });
};
