<template lang="pug">
div
  .card(v-for="message in messages")
    .card-header {{ message.topic }}
    .card-body {{ message.message }}
</template>

<script>
import openSocket from "socket.io-client";
import { ref } from "vue";

export default {
  setup() {
    const messages = ref([]);
    const socket = openSocket("http://localhost:3000", { transports: ["websocket"] });
    socket.on("mqtt", (message) => {
      messages.value.unshift(message);
    });
    return { messages };
  },
};
</script>
