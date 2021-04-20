import { ref } from "vue";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000", { transports: ["websocket"] });

export function getSocket(topic) {
  const data = ref('');
  socket.on(topic, message => data.value = message);
  return data
}
