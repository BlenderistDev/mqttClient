<template lang="pug">
Topic(
  v-for="(topicMessages, topic) in messages"
  :messages="topicMessages"
  :topic="topic"
)
</template>

<script>
import Topic from "./Topic";

export default {
  props: ["messages"],
  components: {
    Topic,
  },
};
</script>
