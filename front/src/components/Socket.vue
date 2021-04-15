<template lang="pug">
div
  ul(class="nav nav-tabs nav-fill")
    li(class="nav-item")
      a(:class="getTabClass('all')" @click="setActiveTab('all')") All
    li(class="nav-item")
      a(:class="getTabClass('topic')" @click="setActiveTab('topic')") Topic

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
  methods: {
    setActiveTab(tab) {
      this.currentView = tab;
    },
    getTabClass(tab) {
      let tabClass = "nav-link";
      if (tab === this.currentView) {
        tabClass += " active";
      }
      return tabClass;
    },
  },
};
</script>
