<template lang="pug">
div(v-if="isMobile")
  img(src="@/assets/menu.png" @click="show = !show")
  .menu(v-if="show")
    .mobile-menu-content(@click="show = false")
      .close X
      ModuleList
</template>

<script>
import { ref } from "vue";
import ModuleList from "./ModuleList";
import { isMobile } from '../../services/window'

export default {
  setup() {
    const show = ref(false);
    return {
      show,
      isMobile
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
  z-index: 100;
}
.mobile-menu-content {
  background-color: #ced4da;
  height: 100vh;
}
img {
  height: 5vh;
}
</style>
