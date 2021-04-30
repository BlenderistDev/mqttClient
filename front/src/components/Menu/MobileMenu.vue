<template lang="pug">
div
  img(src="@/assets/menu.png" @click="show = !show")
  .menu(v-if="show")
    slot
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false)
    return {
      show
    }
  }
}
</script>


<style scoped>
.menu {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
