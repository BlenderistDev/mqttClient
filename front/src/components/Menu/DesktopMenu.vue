<template lang="pug">
.desktop-menu(v-if="!isMobile")
  .desktop-menu-wrap
    ModuleList
</template>

<script>
import ModuleList from "./ModuleList";
import { isMobile } from '../../services/window'

export default {
  components: {
    ModuleList
  },
  setup() {
    return {
      isMobile
    }
  }
}
</script>
<style scoped>
.desktop-menu {
  height: 100%;
  max-width: 250px;
  border-right: 1px solid;
  margin-right: 0px;
  padding-right: 0px;
  background-color: #ced4da36;
}
.desktop-menu-wrap {
  position: sticky;
  top: 0;
}
</style>
