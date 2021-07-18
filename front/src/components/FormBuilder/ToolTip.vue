<template lang="pug">
span.tooltip-button(@click="toggleTooltip") ?
.tooltip-text(
  :style="{ top: `${y}px`, left: `${x}px` }"
  v-if="show"
  @click="show = false"
) {{ text }}
</template>

<script>
import { ref } from "vue";

export default {
  name: "ToolTip",
  props: {
    text: String,
  },
  setup() {
    const show = ref(false);
    const x = ref(0);
    const y = ref(0);
    return {
      show,
      x,
      y,
      toggleTooltip: (e) => {
        const { layerX, layerY } = e;
        show.value = !show.value;
        x.value = layerX;
        y.value = layerY;
      },
    };
  },
};
</script>

<style scoped>
.tooltip-text {
  border: 1px solid black;
  padding: 5px;
  position: absolute;
  background-color: white;
  z-index: 3;
}
.tooltip-button {
  border: 1px solid;
}
</style>
