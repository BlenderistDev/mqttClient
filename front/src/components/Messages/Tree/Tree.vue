<template lang="pug">
ul.list-group
  TreeTopic(:topicTree="topicTree")
</template>

<script>
import TreeTopic from "./TreeTopic";
import { computed } from "@vue/runtime-core";
import _ from "lodash";
import { useStore } from "vuex";

export default {
  name: "Tree",
  components: {
    TreeTopic,
  },
  setup() {
    const store = useStore();
    const groupedMessages = computed(
      () => store.getters["messages/filterGroupedMessages"]
    );
    const topicTree = computed(() => {
      return _.chain(groupedMessages.value)
        .keys()
        .map((topic) =>
          _.chain(topic)
            .split("/")
            .map((topic) => (topic ? topic : "/"))
            .value()
        )
        .value();
    });
    return {
      topicTree,
    };
  },
};
</script>
