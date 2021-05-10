<template lang="pug">
div
  ul(class="nav nav-tabs nav-fill")
    li(class="nav-item")
      a(:class="getTabClass('all')" @click="setActiveTab('all')") All
    li(class="nav-item")
      a(:class="getTabClass('topic')" @click="setActiveTab('topic')") Topic
    li(class="nav-item")
      a(:class="getTabClass('tree')" @click="setActiveTab('tree')") Tree

  AllMessages(v-if="currentView === 'all'")
  TopicMessages(v-if="currentView === 'topic'")
  Tree(v-if="currentView === 'tree'")
</template>

<script>
import { ref, watch } from "vue";
import TopicMessages from "./TopicMessages";
import AllMessages from "./AllMessages";
import Tree from "./Tree";
import { getMqttSocket } from "../../services/socket";
import { useStore } from "vuex";

export default {
  components: {
    TopicMessages,
    AllMessages,
    Tree,
  },
  setup() {
    const store = useStore();
    const currentView = ref("all");
    const message = getMqttSocket();
    watch(message, (message) => {
      store.commit("messages/addMessage", message);
    });
    return {
      messages: store.state.messages.messages,
      groupedMessages: store.state.messages.groupedMessages,
      currentView,
    };
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
