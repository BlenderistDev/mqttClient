<template lang="pug">
div(v-for="topic, key in tree")
  TreeSubtopic(
    :topic="topic"
    :name="key"
  )
    TreeMessages(:topic="topicName + key")
    TreeTopic(
      v-if="topic[0].length > 0"
      :topicTree="topic"
      :topicPrefix="topicName + key"
    )
</template>

<script>
import { computed, toRefs, ref } from "vue";
import TreeSubtopic from "./TreeSubtopic";
import TreeMessages from "./TreeMessages";
import _ from "lodash";
export default {
  name: "TreeTopic",
  props: {
    topicTree: Object,
    topicPrefix: {
      type: String,
      default: "",
    },
  },
  components: {
    TreeSubtopic,
    TreeMessages,
  },
  setup(props) {
    const { topicTree, topicPrefix } = toRefs(props);
    const topicName = ref(topicPrefix.value);
    if (topicName.value !== "/" && topicName.value.length) {
      topicName.value = topicName.value + "/";
    }
    const tree = computed(() =>
      _.chain(topicTree.value)
        .groupBy((topic) => _.nth(topic))
        .mapValues((values) => _.map(values, (topic) => _.slice(topic, 1)))
        .value()
    );
    return {
      tree,
      topicName,
    };
  },
};
</script>

<style scoped>
div {
  margin-left: 10px;
}
</style>
