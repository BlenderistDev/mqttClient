<template lang="pug">
div
  ul(class="nav nav-tabs nav-fill")
    li(class="nav-item")
      a(:class="getTabClass('all')" @click="setActiveTab('all')") All
    li(class="nav-item")
      a(:class="getTabClass('topic')" @click="setActiveTab('topic')") Topic

  AllMessages(
    v-if="currentView === 'all'"
    :messages="messages"
  )
  TopicMessages(
    v-if="currentView === 'topic'"
    :messages="groupedMessages"
  )
</template>

<script>
// import openSocket from "socket.io-client";
import {ref, watch} from "vue";
import _ from "lodash";
import TopicMessages from "./TopicMessages";
import AllMessages from "./AllMessages";
import { getSocket } from "../../services/socket";

export default {
  components: {
    TopicMessages,
    AllMessages,
  },
  setup() {
    const messages = ref([])
    const groupedMessages = ref({});
    const currentView = ref("all");
    const message = getSocket('mqtt')
    watch(message, message => messages.value.unshift(message))
    watch(message, message => {
      messages.value.unshift(message);
      if (_.isUndefined(groupedMessages.value[message.topic])) {
        groupedMessages.value[message.topic] = [];
      }
      groupedMessages.value[message.topic].unshift(message);
    })
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
