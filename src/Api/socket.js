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
  console.log("connect")
  setInterval(() => {
    socket.emit('name', 'test')
  }, 1000)

  socket.on("name", (...args) => {
    console.log('getMessage')
  });
});

httpServer.listen(3000);
