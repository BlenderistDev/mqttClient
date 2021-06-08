<template lang="pug">
.navbar.navbar-light
router-view
</template>

<script>
import {startMqttSocket, startErrorSocket} from "./services/socket";

export default {
  setup() {
    startMqttSocket();
    startErrorSocket();
  }
}
</script>

<style scoped>
.navbar {
  height: 5vh;
  background-color: #ced4da;
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
