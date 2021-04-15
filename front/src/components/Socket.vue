<template lang="pug">
div
  div all {{ groupedMessages.value }}
    input(type="radio" v-model="currentView" value="all")
  div topic
    input(type="radio" v-model="currentView" value="topic")

  .card(v-if="currentView === 'all'" v-for="message in messages")
    .card-header {{ message.topic }}
    .card-body {{ message.message }}

  TopicMessages(
    v-if="currentView === 'topic'" 
    v-for="(messages, topic) in groupedMessages"
    :messages="messages"
    :topic="topic"
  )
</template>

<script>
import openSocket from "socket.io-client";
import { ref } from "vue";
import _ from "lodash";
import TopicMessages from "./TopicMessages";

export default {
  components: {
    TopicMessages,
  },
  setup() {
    const messages = ref([]);
    const groupedMessages = ref({});
    const currentView = ref("all");

    const socket = openSocket("http://localhost:3000", { transports: ["websocket"] });
    socket.on("mqtt", (message) => {
      messages.value.unshift(message);
      if (_.isUndefined(groupedMessages.value[message.topic])) {
        groupedMessages.value[message.topic] = [];
      }
      groupedMessages.value[message.topic].unshift(message);
    });
    return { messages, groupedMessages, currentView };
  },
};
</script>
