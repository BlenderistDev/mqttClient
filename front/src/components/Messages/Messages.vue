<template lang="pug">
div
  SendForm
  ul(class="nav nav-tabs nav-fill")
    li(class="nav-item" v-for="tab, name in tabs")
      a(:class="getTabClass(name)" @click="setActiveTab(name)") {{ tab.name }} {{ tab.count }}
  component(:is="currentTab")
</template>

<script>
import { computed, ref } from "vue";
import TopicMessages from "./Topic/TopicMessages";
import AllMessages from "./AllMessages/AllMessages";
import Tree from "./Tree/Tree";
import SendForm from "./SendForm";
import {useStore} from "vuex";

export default {
  components: {
    TopicMessages,
    AllMessages,
    Tree,
    SendForm
  },
  setup() {
    const store = useStore();
    const messagesCount = computed(() => store.getters["messages/messagesCount"]);
    const topicCount = computed(() => store.getters["messages/topicCount"]);
    const tabs = ref({
      all: {
        component: 'AllMessages',
        name: 'All',
        count: messagesCount
      },
      tree: {
        component: 'Tree',
        name: 'Tree',
      },
      topic: {
        component: 'TopicMessages',
        name: 'topic',
        count: topicCount
      },
    });
    const currentView = ref("all");
    return {
      tabs,
      currentView,
      currentTab: computed(() => tabs.value[currentView.value].component),
      setActiveTab: tab => currentView.value = tab,
      getTabClass: tab => tab === currentView.value ? 'nav-link active' : 'nav-link',
    };
  },
};
</script>
