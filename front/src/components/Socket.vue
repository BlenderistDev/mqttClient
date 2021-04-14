<template>
  <div>
    <div>name: </div>
  </div>
</template>

<script>
import openSocket from "socket.io-client";
export default {
  setup() {
    const socket = openSocket("http://localhost:3000", { transports: ["websocket"] });
    socket.on("mqtt", serverName => {
      console.log(serverName)
    });
    setInterval(() => {
      socket.emit("mqtt", 'azazaza');
    }, 2000)
  },
};
</script>
