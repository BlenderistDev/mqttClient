<template lang="pug">
div(v-if="isMobile")
  img(src="@/assets/menu.png" @click="show = !show")
  .menu(v-if="show")
    .mobile-menu-content
      .module-list
        ModuleList(@click="show = false")
        .btn.btn-secondary.bottom(@click="show = false") Back
</template>

<script>
import { ref } from "vue";
import ModuleList from "./ModuleList";
import { isMobile } from "../../services/window";

export default {
  setup() {
    const show = ref(false);
    return {
      show,
      isMobile,
    };
  },
  components: {
    ModuleList,
  },
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
.module-list {
  padding-top: 32px;
}
.mobile-menu-content {
  background-color: #ced4da;
  height: 100vh;
}
.bottom {
  position: absolute;
  bottom: 0px;
}
</style>
