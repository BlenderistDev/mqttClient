<template lang="pug">
div
  ul(class="nav nav-tabs nav-fill")
    li(class="nav-item" v-for="tab, name in tabs")
      a(:class="getTabClass(name)" @click="setActiveTab(name)") {{ name }}
  component(:is="currentTab")
</template>

<script>
import { computed, ref } from "vue";
import TopicMessages from "./Topic/TopicMessages";
import AllMessages from "./AllMessages/AllMessages";
import Tree from "./Tree/Tree";
import { startMqttSocket } from "../../services/socket";

export default {
  components: {
    TopicMessages,
    AllMessages,
    Tree,
  },
  setup() {
    startMqttSocket();
    const tabs = {
      all: AllMessages,
      tree: Tree,
      topic: TopicMessages,
    };
    const currentView = ref("all");
    const currentTab = computed(() => tabs[currentView.value]);
    return {
      tabs,
      currentView,
      currentTab,
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
