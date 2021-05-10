<template lang="pug">
Topic(
  v-for="(topicMessages, topic) in messages"
  :messages="topicMessages"
  :topic="topic"
)
</template>

<script>
import { useStore } from "vuex";
import Topic from "./Topic";

export default {
  components: {
    Topic,
  },
  setup() {
    const store = useStore();
    return {
      messages: store.state.messages.groupedMessages,
    };
  },
};
</script>
