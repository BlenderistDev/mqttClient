<template lang="pug">
div
  SendForm
  ul.nav.nav-tabs.nav-fill
    li.nav-item(v-for="tab, name in tabs")
      span(:class="getTabClass(name)" @click="setActiveTab(name)")
        span.tabname {{ tab.name }}
        .badge.rounded-pill.bg-info {{ tab.count }}
  Controls
  component(:is="currentTab")
  DetailPopup
</template>

<script>
import { computed, ref } from "vue";
import TopicMessages from "./Topic/TopicMessages";
import AllMessages from "./AllMessages/AllMessages";
import Tree from "./Tree/Tree";
import SendForm from "./SendForm";
import Controls from "./Controls";
import { useStore } from "vuex";
import DetailPopup from "./Message/DetailPopup";

export default {
  components: {
    TopicMessages,
    AllMessages,
    Tree,
    SendForm,
    Controls,
    DetailPopup,
  },
  setup() {
    const store = useStore();
    const messagesCount = computed(() => store.getters["messages/filterMessagesCount"]);
    const topicCount = computed(
      () => store.getters["messages/filterGroupedMessagesCount"]
    );
    const tabs = ref({
      tree: {
        component: "Tree",
        name: "Tree",
      },
      all: {
        component: "AllMessages",
        name: "All",
        count: messagesCount,
      },
      topic: {
        component: "TopicMessages",
        name: "Topic",
        count: topicCount,
      },
    });
    const currentView = ref("tree");
    return {
      tabs,
      currentView,
      currentTab: computed(() => tabs.value[currentView.value].component),
      setActiveTab: (tab) => (currentView.value = tab),
      getTabClass: (tab) => (tab === currentView.value ? "nav-link active" : "nav-link"),
    };
  },
};
</script>

<style scoped>
.badge {
  margin-left: 10px;
}
</style>
