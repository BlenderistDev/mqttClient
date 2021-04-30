<template lang="pug">
div
  MobileMenu(v-if="isMobile")
    ModuleList
  DesktopMenu(v-else)
    ModuleList
</template>

<script>
import ModuleList from './ModuleList';
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import {computed, ref} from 'vue';

export default {
  name: "Menu",
  components: {
    ModuleList,
    DesktopMenu,
    MobileMenu,
  },
  setup() {
    const windowWidth = ref(window.innerWidth)
    window.addEventListener("resize", () => windowWidth.value = window.innerWidth);
    return {
      isMobile: computed(() => windowWidth.value < 768)
    }
  }
}
</script>
