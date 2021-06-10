<template lang="pug">
div
  template(v-for="(topicMessages, topic) in messages")
    Topic(
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
      messages: store.getters["messages/filterGroupedMessages"]
    };
  },
};
</script>

<style scoped>
.filter {
  width: 100%;
}
</style>
