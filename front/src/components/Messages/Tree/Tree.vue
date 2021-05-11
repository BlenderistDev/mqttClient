<template lang="pug">
ul(class="list-group")
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
    const groupedMessages = computed(() => store.state.messages.groupedMessages);
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
