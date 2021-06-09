<template lang="pug">
div
  input.filter(v-model="topicFilter")
  template(v-for="(topicMessages, topic) in messages")
    Topic(
      v-if="topic.includes(topicFilter)"
      :messages="topicMessages"
      :topic="topic"
    )
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Topic from "./Topic";

export default {
  components: {
    Topic,
  },
  setup() {
    const store = useStore();
    const topicFilter = ref("");
    return {
      topicFilter,
      messages: store.state.messages.groupedMessages,
    };
  },
};
</script>

<style scoped>
.filter {
  width: 100%;
}
</style>
