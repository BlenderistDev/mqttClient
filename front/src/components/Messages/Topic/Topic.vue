<template lang="pug">
.card
  .card-header.row(@click="showMessages = !showMessages")
    .col-11 {{ topic }}
    .col-1 {{ messageCount }}
  .card-body(v-if="showMessages")
    MessageList(:messages="messages")
</template>

<script>
import { computed, ref, toRefs } from "vue";
import MessageList from "../MessageList";

export default {
  props: ["messages", "topic"],
  components: {
    MessageList,
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
