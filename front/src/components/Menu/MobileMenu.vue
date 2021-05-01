<template lang="pug">
div
  img(src="@/assets/menu.png" @click="show = !show")
  .menu(v-if="show")
    div(@click="show = false")
      .close X
      slot
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const show = ref(false);
    return {
      show,
    };
  },
};
</script>

<style scoped>
.menu {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}
.close {
  position: relative;
  left: 10px;
  top: 10px;
}
</style>
