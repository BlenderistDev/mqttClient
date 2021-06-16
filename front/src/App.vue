<template lang="pug">
.navbar.navbar-light
  MobileMenu
router-view
</template>

<script>
import {startMqttSocket, startErrorSocket} from "./services/socket";
import MobileMenu from '../src/components/Menu/MobileMenu.vue';
import {useStore} from "vuex";

export default {
  setup() {
    const store = useStore();
    store.commit('messages/initialiseStore');
    window.addEventListener("storage", () => store.commit('messages/initialiseStore'), false);
    startMqttSocket();
    startErrorSocket();
  },
  components: {
    MobileMenu
  }
}
</script>

<style scoped>
.navbar {
  height: 5vh;
  background-color: #ced4da;
  padding-top: 0px;
}
</style>

<style>
body, html {
  height: 100vh
}
#app {
  height: 95vh;
  margin: auto;
}
</style>
