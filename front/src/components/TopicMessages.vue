<template lang="pug">
.card
  .card-header(@click="showMessages = !showMessages") {{ topic }}
  .card-body(v-if="showMessages") {{ messages }}
</template>

<script>
import { ref } from "vue";

export default {
  props: ["messages", "topic"],
  setup() {
    const showMessages = new ref(false);
    return {
      showMessages,
    };
  },
};
</script>
