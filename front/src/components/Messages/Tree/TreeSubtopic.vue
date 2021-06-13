<template lang="pug">
li(class='list-group-item' @click="show = !show") 
  span(v-if="name") {{ name }}
  span(v-else) /
slot(v-if="show")
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
