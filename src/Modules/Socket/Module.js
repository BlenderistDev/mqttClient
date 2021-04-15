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
    const now = new Date()
    mqttMessage.date = now.toLocaleString('en-US', { hour12: false } )
    socket.emit('mqtt', mqttMessage)
  });
});

httpServer.listen(3000);
