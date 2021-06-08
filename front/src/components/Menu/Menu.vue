<template lang="pug">
DesktopMenu(v-if="isDesktop")
</template>

<script>
import ModuleList from "./ModuleList";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { computed, ref } from "vue";

export default {
  name: "Menu",
  components: {
    ModuleList,
    DesktopMenu,
    MobileMenu,
  },
  setup() {
    const windowWidth = ref(window.innerWidth);
    window.addEventListener("resize", () => (windowWidth.value = window.innerWidth));
    return {
      isDesktop: computed(() => windowWidth.value > 992),
    };
  },
};
</script>
