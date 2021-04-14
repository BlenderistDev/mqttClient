<template>
  <div>
    <div>name: {{ displayName }}</div>
  </div>
</template>

<script>
import { useSocketIo, useSocketName } from "../services/socket.js";
export default {
  setup() {
    const socket = useSocketIo("http://localhost:4000", { transports: ["websocket"] });
    const [displayName] = useSocketName(socket);
    return {
      displayName,
    };
  },
};
</script>
