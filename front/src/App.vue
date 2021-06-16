<template lang="pug">
.navbar.navbar-light
  MobileMenu
router-view
</template>

<script>
import { startMqttSocket, startErrorSocket } from "./services/socket";
import { startLocalStorageSync } from "./services/localStorage";
import MobileMenu from "../src/components/Menu/MobileMenu.vue";

export default {
  setup() {
    startLocalStorageSync();
    startMqttSocket();
    startErrorSocket();
  },
  components: {
    MobileMenu,
  },
};
</script>

<style scoped>
.navbar {
  height: 5vh;
  background-color: #ced4da;
  padding-top: 0px;
}
</style>

<style>
body,
html {
  height: 100vh;
}
#app {
  height: 95vh;
  margin: auto;
}
</style>
