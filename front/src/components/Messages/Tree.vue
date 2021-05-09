<template lang="pug">
TreeTopic(:topicTree="topicTree")
</template>

<script>
import { toRefs } from "@vue/reactivity";
import TreeTopic from "./TreeTopic";
import { computed } from "@vue/runtime-core";
import _ from "lodash";

export default {
  name: "Tree",
  props: ["messages", "groupedMessages"],
  components: {
    TreeTopic,
  },
  setup(props) {
    const { groupedMessages } = toRefs(props);
    const topicList = computed(() => _.keys(groupedMessages.value));
    const topicTree = computed(() => {
      return _.chain(groupedMessages.value)
        .keys()
        .map((topic) => _.split(topic, "/"))
        .value();
    });
    return {
      topicList,
      topicTree,
    };
  },
};
</script>
