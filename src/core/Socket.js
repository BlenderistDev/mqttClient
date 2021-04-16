import { createServer } from "http";
import { Server } from "socket.io";
import EventEmitter from 'events';

export const socketEmitter = new EventEmitter();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socketEmitter.on('message', (socketMessage) => {
    socket.emit(socketMessage.topic, socketMessage.message)
  });
});

httpServer.listen(3000);

