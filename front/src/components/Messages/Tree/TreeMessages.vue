<template lang="pug">
div
  u(@click="show = !show") Messages
  .badge.rounded-pill.bg-secondary {{ topicMessages.length }}
  div(v-if="show")
    MessageList(:messages="topicMessages")
</template>

<script>
import { computed, toRefs, ref } from "vue";
import { useStore } from "vuex";
import MessageList from "../MessageList";
import _ from "lodash";

export default {
  name: "TreeMessages",
  props: ["topic"],
  components: {
    MessageList,
  },
  setup(props) {
    const { topic } = toRefs(props);
    const store = useStore();
    const messages = computed(() => store.getters["messages/groupedMessages"]);
    const topicMessages = computed(() =>
      _.chain(messages.value)
        .pickBy((message, messageTopic) => _.startsWith(messageTopic, topic.value))
        .values()
        .flatten()
        .sortBy("date")
        .reverse()
        .value()
    );
    const show = ref(false);
    return {
      messages,
      topicMessages,
      show,
    };
  },
};
</script>
<style scoped>
.badge {
  margin-left: 10px;
}
</style>
