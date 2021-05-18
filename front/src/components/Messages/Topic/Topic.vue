<template lang="pug">
.card
  .card-header.row(@click="showMessages = !showMessages")
    .col-11 {{ topic }}
    .col-1 {{ messageCount }}
  .card-body(v-if="showMessages")
    .justify-content-between(v-for="message in messages")
      Message(:message="message")
</template>

<script>
import { computed, ref, toRefs } from "vue";
import Message from "../Message";

export default {
  props: ["messages", "topic"],
  components: {
    Message,
  },
  setup(props) {
    const { messages } = toRefs(props);
    const showMessages = new ref(false);
    return {
      showMessages,
      messageCount: computed(() => messages.value.length),
    };
  },
};
</script>
