<template lang="pug">
template(v-for="(topicMessages, topic) in messages")
  Topic(
    :messages="topicMessages"
    :topic="topic"
  )
</template>

<script>
import { useStore } from "vuex";
import Topic from "./Topic";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    Topic,
  },
  setup() {
    const store = useStore();
    return {
      messages: computed(() => store.getters["messages/filterGroupedMessages"]),
    };
  },
};
</script>
