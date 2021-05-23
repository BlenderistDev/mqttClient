<template lang="pug">
div
  SendForm
  ul(class="nav nav-tabs nav-fill")
    li(class="nav-item" v-for="tab, name in tabs")
      span(:class="getTabClass(name)" @click="setActiveTab(name)")
        span.tabname {{ tab.name }} 
        .badge.rounded-pill.bg-info {{ tab.count }}
  component(:is="currentTab")
</template>

<script>
import { computed, ref } from "vue";
import TopicMessages from "./Topic/TopicMessages";
import AllMessages from "./AllMessages/AllMessages";
import Tree from "./Tree/Tree";
import SendForm from "./SendForm";
import { useStore } from "vuex";

export default {
  components: {
    TopicMessages,
    AllMessages,
    Tree,
    SendForm,
  },
  setup() {
    const store = useStore();
    const messagesCount = computed(() => store.getters["messages/messagesCount"]);
    const topicCount = computed(() => store.getters["messages/topicCount"]);
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
