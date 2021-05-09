<template lang="pug">
div
  div(v-for="topic, key in tree")
    TreeSubtopic(
      :topic="topic"
      :name="key"
    )
      TreeTopic(
        v-if="topic[0].length > 0"
        :topicTree="topic"
      )
</template>

<script>
import { computed, toRefs } from "vue";
import TreeSubtopic from "./TreeSubtopic";
import _ from "lodash";
export default {
  name: "TreeTopic",
  props: ["topicTree"],
  components: {
    TreeSubtopic,
  },
  setup(props) {
    const { topicTree } = toRefs(props);
    const tree = computed(() => {
      return _.chain(topicTree.value)
        .groupBy((topic) => _.nth(topic))
        .mapValues((values) =>
          _.chain(values)
            .map((topic) => _.slice(topic, 1))
            .value()
        )
        .value();
    });
    return {
      tree,
    };
  },
};
</script>

<style scoped>
div {
  margin-left: 20px;
}
</style>
