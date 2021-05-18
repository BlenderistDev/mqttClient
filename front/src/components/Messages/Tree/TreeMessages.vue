<template lang="pug">
div
  u(@click="show = !show") Messages
  div(v-if="show")
    .card(v-for="message in topicMessages")
      .card-header {{ message.topic }}
      .card-body.justify-content-between
        Message(:message="message")
</template>

<script>
import { computed, toRefs, ref } from "vue";
import { useStore } from "vuex";
import Message from "../Message";
import _ from "lodash";

export default {
  name: "TreeMessages",
  props: ["topic"],
  components: {
    Message,
  },
  setup(props) {
    const { topic } = toRefs(props);
    const store = useStore();
    const messages = computed(() => store.state.messages.groupedMessages);
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
