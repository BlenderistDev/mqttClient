<template lang="pug">
div
  li(class='list-group-item' @click="show = !show") 
    span(v-if="name") {{ name }}
    span(v-else) /
  div(v-if="show")
    slot
</template>

<script>
import { ref } from "@vue/reactivity";
import TreeTopic from "./TreeTopic";

export default {
  name: "TreeSubtopic",
  components: {
    TreeTopic,
  },
  props: ["topic", "name"],
  setup() {
    return {
      show: ref(false),
    };
  },
};
</script>
