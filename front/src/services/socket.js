import { ref } from "vue";
import openSocket from "socket.io-client";

export function useSocketIo(url) {
  return openSocket(url);
}

export function useSocketName(socket) {
  const name = ref("");

  socket.on("name", serverName => {
    name.value = serverName;
  });

  function setDisplayName(value) {
    socket.emit("updateName", value);
  }

  return [name, setDisplayName];
}
