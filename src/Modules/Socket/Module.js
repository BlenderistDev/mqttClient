import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  process.on('message', (mqttMessage) => {
    socket.emit('mqtt', mqttMessage)
  });
});

httpServer.listen(3000);
