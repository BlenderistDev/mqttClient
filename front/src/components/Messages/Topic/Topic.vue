<template lang="pug">
.card
  .card-header.row(@click="showMessages = !showMessages")
    .col-11 {{ topic }}
    .col-1 {{ messageCount }}
  .card-body(v-if="showMessages")
    .row.justify-content-between(v-for="message in messages")
      .col-10 {{ message.message }}
      .col-2 {{ message.date }}
</template>

<script>
import { computed, ref, toRefs } from "vue";

export default {
  props: ["messages", "topic"],
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
