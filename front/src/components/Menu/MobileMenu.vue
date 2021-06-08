<template lang="pug">
div
  img(src="@/assets/menu.png" @click="show = !show")
  .menu(v-if="show")
    div.mobile-menu-content(@click="show = false")
      .close X
      ModuleList
</template>

<script>
import { ref } from "vue";
import ModuleList from "./ModuleList";

export default {
  setup() {
    const show = ref(false);
    return {
      show,
    };
  },
  components: {
    ModuleList
  }
};
</script>

<style scoped>
.menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.close {
  position: relative;
  left: 10px;
  top: 10px;
}
.mobile-menu-content {
  background-color: #ced4da;
  height: 100vh;
}
</style>
