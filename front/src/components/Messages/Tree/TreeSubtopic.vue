<template lang="pug">
div
  div(@click="show = !show") {{ name }}
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
