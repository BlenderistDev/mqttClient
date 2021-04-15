<template lang="pug">
div
  div all
    input(type="radio" v-model="currentView" value="all")
  div topic
    input(type="radio" v-model="currentView" value="topic")

  .card(v-if="currentView === 'all'" v-for="message in messages")
    .card-header {{ message.topic }}
    .card-body {{ message.message }}
  
  .card(v-if="currentView === 'topic'" v-for="(messages, topic) in groupedMessages")
    .card-header {{ topic }}
</template>

<script>
import openSocket from "socket.io-client";
import { ref, computed } from "vue";
import _ from "lodash";

export default {
  setup() {
    const messages = ref([]);
    const currentView = ref("all");
    const socket = openSocket("http://localhost:3000", { transports: ["websocket"] });
    socket.on("mqtt", (message) => {
      messages.value.unshift(message);
    });
    const groupedMessages = computed(() =>
      _.reduce(
        messages.value,
        (groupedMessages, message) => {
          if (_.isUndefined(groupedMessages[message.topic])) {
            groupedMessages[message.topic] = [];
          }
          groupedMessages[message.topic].push(message.message);
          return groupedMessages;
        },
        {}
      )
    );
    return { messages, groupedMessages, currentView };
  },
};
</script>
