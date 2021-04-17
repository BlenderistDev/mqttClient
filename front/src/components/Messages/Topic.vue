<template lang="pug">
.card
  .card-header(@click="showMessages = !showMessages") {{ topic }}
  .card-body(v-if="showMessages")
    Messages(:messages="messages")
</template>

<script>
import { ref } from "vue";
import Messages from "./Messages";

export default {
  props: ["messages", "topic"],
  components: {
    Messages,
  },
  setup() {
    const showMessages = new ref(false);
    return {
      showMessages,
    };
  },
};
</script>
